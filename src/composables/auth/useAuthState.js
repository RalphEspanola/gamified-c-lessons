import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

// Shared state across all components
const session = ref(null)
const user = ref(null)
let initialized = false
let authListener = null

export const useAuthState = () => {
  /**
   * Initialize auth state and set up listener
   */
  const initAuth = async () => {
    if (initialized) return session.value

    try {
      // Get current session
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession()
      session.value = currentSession
      user.value = currentSession?.user || null

      // Set up auth state change listener (only once)
      if (!authListener) {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log('Auth state changed:', event)
          session.value = newSession
          user.value = newSession?.user || null

          // Handle different auth events
          if (event === 'SIGNED_OUT') {
            session.value = null
            user.value = null
          }
        })
        authListener = subscription
      }

      initialized = true
    } catch (error) {
      console.error('Failed to initialize auth:', error)
    }

    return session.value
  }

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!session.value
  }

  /**
   * Get current user
   */
  const getCurrentUser = () => {
    return user.value
  }

  /**
   * Get current session
   */
  const getSession = () => {
    return session.value
  }

  /**
   * Sign out and clear state
   */
  const signOut = async () => {
    await supabase.auth.signOut()
    session.value = null
    user.value = null
  }

  /**
   * Cleanup listener (optional - for when app unmounts)
   */
  const cleanup = () => {
    if (authListener) {
      authListener.unsubscribe()
      authListener = null
      initialized = false
    }
  }

  return {
    session,
    user,
    initAuth,
    isAuthenticated,
    getCurrentUser,
    getSession,
    signOut,
    cleanup,
  }
}
