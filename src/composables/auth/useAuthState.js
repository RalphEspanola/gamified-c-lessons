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
    console.log('🔐 initAuth called, initialized:', initialized)

    if (initialized) {
      console.log('✅ Already initialized, session exists:', !!session.value)
      return session.value
    }

    try {
      // Get current session
      console.log('🔍 Fetching session from Supabase...')
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error('❌ Error getting session:', error)
        throw error
      }

      session.value = currentSession
      user.value = currentSession?.user || null

      console.log('📦 Session retrieved:', {
        hasSession: !!currentSession,
        userId: currentSession?.user?.id,
        email: currentSession?.user?.email,
        expiresAt: currentSession?.expires_at,
      })

      // Set up auth state change listener (only once)
      if (!authListener) {
        console.log('👂 Setting up auth listener...')
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log('🔔 Auth state changed:', event, {
            hasSession: !!newSession,
            userId: newSession?.user?.id,
          })

          session.value = newSession
          user.value = newSession?.user || null

          // Handle different auth events
          if (event === 'SIGNED_OUT') {
            console.log('👋 User signed out')
            session.value = null
            user.value = null
          }

          if (event === 'TOKEN_REFRESHED') {
            console.log('🔄 Token refreshed successfully')
          }
        })
        authListener = subscription
      }

      initialized = true
      console.log('✅ Auth initialized successfully')
    } catch (error) {
      console.error('❌ Failed to initialize auth:', error)
    }

    return session.value
  }

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    const authenticated = !!session.value
    console.log('🔒 isAuthenticated check:', authenticated, 'userId:', user.value?.id)
    return authenticated
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
    console.log('👋 Signing out...')
    await supabase.auth.signOut()
    session.value = null
    user.value = null
    initialized = false
    console.log('✅ Signed out successfully')
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
