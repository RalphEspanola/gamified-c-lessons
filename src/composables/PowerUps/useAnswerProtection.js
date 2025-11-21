// composables/useAnswerProtection.js
import { ref, computed } from 'vue'

const answerProtectionActive = ref(false) // Is protection currently active?
const protectionUsed = ref(false) // Has protection been used in current session?

export function useAnswerProtection() {
  // Load from storage
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem('answerProtectionActive')
      if (saved !== null) {
        answerProtectionActive.value = saved === 'true'
      }
    } catch (e) {
      console.error('Failed to load answer protection:', e)
    }
  }

  // Save to storage
  const saveToStorage = () => {
    try {
      localStorage.setItem('answerProtectionActive', answerProtectionActive.value.toString())
    } catch (e) {
      console.error('Failed to save answer protection:', e)
    }
  }

  // Initialize
  loadFromStorage()

  // Activate protection (called from PowerUps page)
  const activateAnswerProtection = () => {
    answerProtectionActive.value = true
    protectionUsed.value = false
    saveToStorage()
    return true
  }

  // Check if protection is active and can be used
  const isProtectionActive = computed(() => {
    return answerProtectionActive.value && !protectionUsed.value
  })

  // Use protection (called when user answers incorrectly)
  const useProtection = () => {
    if (isProtectionActive.value) {
      protectionUsed.value = true
      answerProtectionActive.value = false
      saveToStorage()
      return true // Protection was used, don't lose heart
    }
    return false // No protection available
  }

  // Reset protection for new lesson
  const resetProtection = () => {
    if (protectionUsed.value) {
      answerProtectionActive.value = false
      protectionUsed.value = false
      saveToStorage()
    }
  }

  // Deactivate protection
  const deactivateProtection = () => {
    answerProtectionActive.value = false
    protectionUsed.value = false
    saveToStorage()
  }

  return {
    isProtectionActive,
    activateAnswerProtection,
    useProtection,
    resetProtection,
    deactivateProtection,
  }
}
