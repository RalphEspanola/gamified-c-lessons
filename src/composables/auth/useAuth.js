// composables/useAuth.js
import { ref, computed } from 'vue'

const currentUser = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

// Check if user is stored in localStorage on init
const initAuth = () => {
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    try {
      currentUser.value = JSON.parse(storedUser)
    } catch (e) {
      console.error('Failed to parse stored user:', e)
      localStorage.removeItem('currentUser')
    }
  }
}

// Initialize on first load
initAuth()

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null)

  const login = async (email, password, rememberMe = false) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get stored users
      const usersJson = localStorage.getItem('users')
      const users = usersJson ? JSON.parse(usersJson) : []

      // Find user
      const user = users.find((u) => u.email === email && u.password === password)

      if (!user) {
        errorMessage.value = 'Invalid email or password'
        return false
      }

      // Store current user (without password)
      const userWithoutPassword = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
      }

      currentUser.value = userWithoutPassword

      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      }

      return true
    } catch (error) {
      errorMessage.value = 'An error occurred. Please try again.'
      console.error('Login error:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async ({ fullName, email, password }) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing users
      const usersJson = localStorage.getItem('users')
      const users = usersJson ? JSON.parse(usersJson) : []

      // Check if email already exists
      if (users.some((u) => u.email === email)) {
        errorMessage.value = 'Email already registered'
        return false
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullName,
        email,
        password, // In production, this should be hashed!
        createdAt: new Date().toISOString(),
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Auto-login after registration
      const userWithoutPassword = {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt,
      }

      currentUser.value = userWithoutPassword
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      errorMessage.value = 'An error occurred. Please try again.'
      console.error('Registration error:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
  }

  const updateProfile = (updates) => {
    if (currentUser.value) {
      currentUser.value = { ...currentUser.value, ...updates }
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    }
  }

  return {
    currentUser: computed(() => currentUser.value),
    isAuthenticated,
    isLoading: computed(() => isLoading.value),
    errorMessage: computed(() => errorMessage.value),
    login,
    register,
    logout,
    updateProfile,
  }
}
