import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

const isDoubleXPActive = ref(false)
const isConsuming = ref(false)

export function useDoubleXP() {
  const hasDoubleXPInInventory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return false

      const { data } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'double_xp')
        .single()

      return data && data.quantity > 0
    } catch (error) {
      console.error('Error checking Double XP inventory:', error)
      return false
    }
  }

  const initializeDoubleXP = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('user_powerups')
        .select('double_xp_active')
        .eq('user_id', user.id)
        .single()

      if (data && data.double_xp_active) {
        const hasInventory = await hasDoubleXPInInventory()
        if (hasInventory) {
          isDoubleXPActive.value = true
        } else {
          isDoubleXPActive.value = false
          await saveToSupabase()
        }
      }
    } catch (error) {
      console.error('Error loading double XP:', error)
    }
  }

  const saveToSupabase = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('user_powerups')
        .update({
          double_xp_active: isDoubleXPActive.value,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error saving double XP:', error)
    }
  }

  const activateDoubleXP = async () => {
    const hasInventory = await hasDoubleXPInInventory()
    if (!hasInventory) {
      console.warn('Cannot activate Double XP: not in inventory')
      return false
    }

    isDoubleXPActive.value = true
    await saveToSupabase()
    return true
  }

  const consumeDoubleXP = async () => {
    if (!isDoubleXPActive.value || isConsuming.value) return

    isConsuming.value = true

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        isConsuming.value = false
        return
      }

      const { data: current } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'double_xp')
        .single()

      if (current && current.quantity > 0) {
        await supabase
          .from('user_inventory')
          .update({
            quantity: current.quantity - 1,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('item_key', 'double_xp')
      }

      isDoubleXPActive.value = false
      await saveToSupabase()
    } catch (error) {
      console.error('Error consuming double XP:', error)
    } finally {
      isConsuming.value = false
    }
  }

  // ✅ Called on logout to clear state before next user loads
  const reset = () => {
    isDoubleXPActive.value = false
    isConsuming.value = false
    console.log('🔄 Double XP state reset')
  }

  return {
    isDoubleXPActive,
    activateDoubleXP,
    consumeDoubleXP,
    initializeDoubleXP,
    reset,
  }
}
