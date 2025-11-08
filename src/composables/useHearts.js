// composables/useHearts.js
import { ref, computed, onMounted, onUnmounted } from 'vue'

const MAX_HEARTS = 5
const REFILL_TIME = 30 * 60 * 1000 // 30 minutes in milliseconds

// Global state (shared across all components)
const hearts = ref(MAX_HEARTS)
const lastLostTime = ref(Date.now())
let refillInterval = null

export function useHearts() {
  // Load from storage on first use
  onMounted(() => {
    try {
      const savedHearts = window.localStorage?.getItem('hearts')
      const savedTime = window.localStorage?.getItem('lastLostTime')

      if (savedHearts !== null) hearts.value = parseInt(savedHearts)
      if (savedTime !== null) lastLostTime.value = parseInt(savedTime)

      // Start refill checking
      startRefillInterval()
      refillHearts()
    } catch (error) {
      console.warn('localStorage not available, hearts will not persist')
    }
  })

  onUnmounted(() => {
    stopRefillInterval()
  })

  // Start interval to check for refills
  const startRefillInterval = () => {
    if (!refillInterval) {
      refillInterval = setInterval(() => {
        refillHearts()
      }, 1000)
    }
  }

  const stopRefillInterval = () => {
    if (refillInterval) {
      clearInterval(refillInterval)
      refillInterval = null
    }
  }

  // Save to storage
  const saveToStorage = () => {
    try {
      window.localStorage?.setItem('hearts', hearts.value.toString())
      window.localStorage?.setItem('lastLostTime', lastLostTime.value.toString())
    } catch (error) {
      console.warn('Could not save to localStorage')
    }
  }

  // Calculate hearts to refill based on time passed
  const refillHearts = () => {
    if (hearts.value >= MAX_HEARTS) return

    const now = Date.now()
    const timePassed = now - lastLostTime.value
    const heartsToRefill = Math.floor(timePassed / REFILL_TIME)

    if (heartsToRefill > 0) {
      hearts.value = Math.min(MAX_HEARTS, hearts.value + heartsToRefill)
      lastLostTime.value = now - (timePassed % REFILL_TIME)
      saveToStorage()
    }
  }

  // Lose a heart
  const loseHeart = () => {
    if (hearts.value > 0) {
      hearts.value--
      lastLostTime.value = Date.now()
      saveToStorage()
      return true
    }
    return false
  }

  // Gain a heart (reward for completing lessons)
  const gainHeart = () => {
    if (hearts.value < MAX_HEARTS) {
      hearts.value++
      saveToStorage()
      return true
    }
    return false
  }

  // Restore all hearts (admin/testing)
  const restoreAllHearts = () => {
    hearts.value = MAX_HEARTS
    lastLostTime.value = Date.now()
    saveToStorage()
  }

  // Time until next heart refills
  const timeUntilNextHeart = computed(() => {
    if (hearts.value >= MAX_HEARTS) return 0
    const now = Date.now()
    const timePassed = now - lastLostTime.value
    const timeRemaining = REFILL_TIME - (timePassed % REFILL_TIME)
    return timeRemaining
  })

  const canContinue = computed(() => hearts.value > 0)

  // Format time remaining
  const formattedTimeRemaining = computed(() => {
    const ms = timeUntilNextHeart.value
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  // Heart percentage (for progress bar)
  const heartPercentage = computed(() => {
    return (hearts.value / MAX_HEARTS) * 100
  })

  return {
    hearts,
    MAX_HEARTS,
    loseHeart,
    gainHeart,
    refillHearts,
    restoreAllHearts,
    canContinue,
    timeUntilNextHeart,
    formattedTimeRemaining,
    heartPercentage,
  }
}
