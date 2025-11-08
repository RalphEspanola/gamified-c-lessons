import { ref, computed } from 'vue'
import { useHearts } from './useHearts'

// In-game currency
const coins = ref(100) // Starting coins

// Power-ups inventory
const powerUps = ref({
  streakSaver: 0,
  doubleXP: 0,
  hintReveal: 0,
})

export function useShop() {
  const { restoreAllHearts, gainHeart, hearts, MAX_HEARTS } = useHearts()

  // Load from storage
  const loadFromStorage = () => {
    try {
      const savedCoins = window.localStorage?.getItem('coins')
      const savedPowerUps = window.localStorage?.getItem('powerUps')

      if (savedCoins !== null) coins.value = parseInt(savedCoins)
      if (savedPowerUps !== null) powerUps.value = JSON.parse(savedPowerUps)
    } catch (error) {
      console.warn('Could not load shop data from localStorage')
    }
  }

  // Save to storage
  const saveToStorage = () => {
    try {
      window.localStorage?.setItem('coins', coins.value.toString())
      window.localStorage?.setItem('powerUps', JSON.stringify(powerUps.value))
    } catch (error) {
      console.warn('Could not save shop data to localStorage')
    }
  }

  // Initialize
  loadFromStorage()

  // Add coins (earned from completing lessons)
  const addCoins = (amount) => {
    coins.value += amount
    saveToStorage()
  }

  // Spend coins
  const spendCoins = (amount) => {
    if (coins.value >= amount) {
      coins.value -= amount
      saveToStorage()
      return true
    }
    return false
  }

  // Buy heart refill
  const buyHeartRefill = (type) => {
    const prices = {
      single: 10,
      full: 30,
    }

    if (spendCoins(prices[type])) {
      if (type === 'single') {
        gainHeart()
      } else {
        restoreAllHearts()
      }
      return true
    }
    return false
  }

  // Buy power-up
  const buyPowerUp = (powerUpType, price) => {
    if (spendCoins(price)) {
      powerUps.value[powerUpType]++
      saveToStorage()
      return true
    }
    return false
  }

  // Use power-up
  const usePowerUp = (powerUpType) => {
    if (powerUps.value[powerUpType] > 0) {
      powerUps.value[powerUpType]--
      saveToStorage()
      return true
    }
    return false
  }

  // Check if can afford
  const canAfford = (price) => {
    return coins.value >= price
  }

  // Shop items catalog
  const shopItems = computed(() => [
    // Heart Refills
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
    // Power-ups
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
      id: 'hint-reveal',
      name: 'Hint Reveal',
      description: 'Get a hint for any question',
      icon: 'mdi-lightbulb-on',
      price: 15,
      type: 'powerup',
      category: 'Power-ups',
      color: 'purple',
      owned: powerUps.value.hintReveal,
    },
  ])

  return {
    coins,
    powerUps,
    shopItems,
    addCoins,
    spendCoins,
    buyHeartRefill,
    buyPowerUp,
    usePowerUp,
    canAfford,
  }
}
