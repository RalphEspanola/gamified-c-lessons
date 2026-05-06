import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import { useHearts } from '@/composables/PowerUps/useHearts'

const powerUps = ref({
  streakSaver: 0,
  doubleXP: 0,
  answerProtect: 0,
})
const coins = ref(0)

export function useShop() {
  const { restoreAllHearts, gainHeart, hearts, MAX_HEARTS } = useHearts()

  const initializeShop = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      console.log('🔄 Initializing shop...')

      const { data: stats } = await supabase
        .from('user_stats')
        .select('coins')
        .eq('user_id', user.id)
        .single()

      if (stats) {
        coins.value = stats.coins
        console.log('💰 Coins loaded:', coins.value)
      }

      const { data: inventory, error: inventoryError } = await supabase
        .from('user_inventory')
        .select('item_key, quantity')
        .eq('user_id', user.id)

      if (inventoryError) {
        console.error('❌ Error loading inventory:', inventoryError)
        return
      }

      if (inventory) {
        powerUps.value = {
          streakSaver: inventory.find((i) => i.item_key === 'streak_saver')?.quantity || 0,
          doubleXP: inventory.find((i) => i.item_key === 'double_xp')?.quantity || 0,
          answerProtect: inventory.find((i) => i.item_key === 'answer_protect')?.quantity || 0,
        }
        console.log('📦 Power-ups loaded:', powerUps.value)
      }
    } catch (error) {
      console.error('❌ Error loading shop data:', error)
    }
  }

  const addCoins = async (amount) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      coins.value += amount

      await supabase
        .from('user_stats')
        .update({
          coins: coins.value,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error adding coins:', error)
    }
  }

  const spendCoins = async (amount) => {
    if (coins.value >= amount) {
      await addCoins(-amount)
      return true
    }
    return false
  }

  const buyHeartRefill = async (type) => {
    const prices = { single: 10, full: 30 }
    if (await spendCoins(prices[type])) {
      if (type === 'single') await gainHeart()
      else await restoreAllHearts()
      return true
    }
    return false
  }

  const buyPowerUp = async (powerUpType, price) => {
    try {
      console.log(`🛒 Attempting to buy ${powerUpType} for ${price} coins`)

      if (!(await spendCoins(price))) {
        console.log('❌ Not enough coins')
        return false
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        console.log('❌ No user found')
        return false
      }

      const itemKeyMap = {
        streakSaver: 'streak_saver',
        doubleXP: 'double_xp',
        answerProtect: 'answer_protect',
      }

      const itemKey = itemKeyMap[powerUpType]
      console.log(`📝 Item key: ${itemKey}`)

      const { data: existing, error: fetchError } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', itemKey)
        .maybeSingle()

      if (fetchError) {
        console.error('❌ Error fetching existing inventory:', fetchError)
        return false
      }

      const currentQuantity = existing?.quantity || 0
      const newQuantity = currentQuantity + 1

      console.log(`📊 Current quantity: ${currentQuantity}, New quantity: ${newQuantity}`)

      const { error: upsertError } = await supabase.from('user_inventory').upsert(
        {
          user_id: user.id,
          item_key: itemKey,
          quantity: newQuantity,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,item_key' },
      )

      if (upsertError) {
        console.error('❌ Error upserting inventory:', upsertError)
        return false
      }

      powerUps.value[powerUpType] = newQuantity
      console.log(`✅ Successfully bought ${powerUpType}! New count: ${newQuantity}`)
      console.log('📦 Updated powerUps:', powerUps.value)

      return true
    } catch (error) {
      console.error('❌ Error buying power-up:', error)
      return false
    }
  }

  const canAfford = (price) => coins.value >= price

  const shopItems = computed(() => [
    {
      id: 'heart-single',
      name: 'Single Heart',
      description: 'Restore 1 heart instantly',
      icon: 'mdi-heart-plus',
      price: 10,
      type: 'heart',
      category: 'Hearts',
      color: 'red',
      disabled: hearts.value >= MAX_HEARTS,
    },
    {
      id: 'heart-full',
      name: 'Full Heart Refill',
      description: 'Restore all hearts to maximum',
      icon: 'mdi-heart-multiple',
      price: 30,
      type: 'heart',
      category: 'Hearts',
      color: 'red',
      badge: 'BEST VALUE',
      disabled: hearts.value >= MAX_HEARTS,
    },
    {
      id: 'streak-saver',
      name: 'Streak Saver',
      description: 'Protect your streak for the next day if you miss it',
      icon: 'mdi-shield-check',
      price: 40,
      type: 'powerup',
      category: 'Power-ups',
      color: 'green',
      badge: 'POPULAR',
      owned: powerUps.value.streakSaver,
    },
    {
      id: 'double-xp',
      name: 'Double XP Boost',
      description: 'Earn 2x XP for the next lesson',
      icon: 'mdi-lightning-bolt',
      price: 35,
      type: 'powerup',
      category: 'Power-ups',
      color: 'yellow',
      owned: powerUps.value.doubleXP,
    },
    {
      id: 'answer-protect',
      name: 'Answer Protection',
      description: 'Prevents heart loss from one wrong answer',
      icon: 'mdi-shield-heart',
      price: 25,
      type: 'powerup',
      category: 'Power-ups',
      color: 'red',
      owned: powerUps.value.answerProtect,
    },
  ])

  // ✅ Called on logout to clear state before next user loads
  const reset = () => {
    coins.value = 0
    powerUps.value = { streakSaver: 0, doubleXP: 0, answerProtect: 0 }
    console.log('🔄 Shop state reset')
  }

  return {
    coins,
    powerUps,
    shopItems,
    addCoins,
    spendCoins,
    buyHeartRefill,
    buyPowerUp,
    canAfford,
    initializeShop,
    reset,
  }
}
