// composables/useStreakSaver.js
import { ref, computed } from 'vue'

const streakProtectionActive = ref(false)
const protectionExpiresAt = ref(null)

export function useStreakSaver() {
  // Load from storage
  const loadFromStorage = () => {
    try {
      const savedProtection = window.localStorage?.getItem('streakProtectionActive')
      const savedExpiry = window.localStorage?.getItem('streakProtectionExpiry')

      if (savedProtection !== null) {
        streakProtectionActive.value = savedProtection === 'true'
      }
      if (savedExpiry !== null) {
        protectionExpiresAt.value = parseInt(savedExpiry)

        // Check if expired
        if (protectionExpiresAt.value && Date.now() > protectionExpiresAt.value) {
          deactivateProtection()
        }
      }
    } catch (error) {
      console.warn('Could not load streak protection data')
    }
  }

  // Save to storage
  const saveToStorage = () => {
    try {
      window.localStorage?.setItem(
        'streakProtectionActive',
        streakProtectionActive.value.toString(),
      )
      window.localStorage?.setItem(
        'streakProtectionExpiry',
        protectionExpiresAt.value?.toString() || '',
      )
    } catch (error) {
      console.warn('Could not save streak protection data')
    }
  }

  // Initialize
  loadFromStorage()

  // Activate streak protection
  const activateStreakSaver = () => {
    streakProtectionActive.value = true
    // Set expiration to next day at midnight
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(23, 59, 59, 999)
    protectionExpiresAt.value = tomorrow.getTime()
    saveToStorage()
  }

  // Deactivate protection
  const deactivateProtection = () => {
    streakProtectionActive.value = false
    protectionExpiresAt.value = null
    saveToStorage()
  }

  // Check if streak is protected
  const isStreakProtected = computed(() => {
    if (!streakProtectionActive.value || !protectionExpiresAt.value) {
      return false
    }

    // Check if protection has expired
    if (Date.now() > protectionExpiresAt.value) {
      deactivateProtection()
      return false
    }

    return true
  })

  // Use streak protection (called when user misses a day)
  const useStreakProtection = () => {
    if (isStreakProtected.value) {
      deactivateProtection()
      return true // Streak was saved
    }
    return false // No protection active
  }

  // Time remaining
  const timeRemaining = computed(() => {
    if (!protectionExpiresAt.value) return 0
    const remaining = protectionExpiresAt.value - Date.now()
    return Math.max(0, remaining)
  })

  const formattedTimeRemaining = computed(() => {
    const hours = Math.floor(timeRemaining.value / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  })

  return {
    isStreakProtected,
    activateStreakSaver,
    useStreakProtection,
    timeRemaining,
    formattedTimeRemaining,
  }
}
