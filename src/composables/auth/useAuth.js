import { computed } from 'vue'
import { useAuthState } from './useAuthState'

export function useAuth() {
  const { user, session, isAuthenticated, signOut, initAuth } = useAuthState()

  // Computed property for current user (reactive)
  const currentUser = computed(() => user.value)

  // Check if user is logged in
  const isLoggedIn = computed(() => isAuthenticated())

  // Get user metadata helper
  const getUserMetadata = (key) => {
    return currentUser.value?.user_metadata?.[key] || null
  }

  // Get user email
  const userEmail = computed(() => currentUser.value?.email || '')

  // Get user ID
  const userId = computed(() => currentUser.value?.id || null)

  return {
    currentUser,
    session,
    isLoggedIn,
    isAuthenticated,
    signOut,
    initAuth,
    getUserMetadata,
    userEmail,
    userId,
  }
}
