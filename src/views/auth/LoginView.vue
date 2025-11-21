<!-- LoginView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth/useAuth'

const router = useRouter()
const { login, isLoading, errorMessage } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

// Form validation rules
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v.length >= 6 || 'Password must be at least 6 characters',
]

const handleLogin = async () => {
  const success = await login(email.value, password.value, rememberMe.value)
  if (success) {
    router.push('/')
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Left Side - Branding -->
      <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center primary">
        <div class="text-center pa-8">
          <v-icon size="120" color="white" class="mb-4">mdi-code-braces</v-icon>
          <h1 class="text-h2 font-weight-bold white--text mb-4">ITE 12 Learning</h1>
          <p class="text-h6 white--text">Master C Programming with Interactive Lessons</p>
          <v-chip class="mt-4" color="white" size="large">
            <v-icon start>mdi-school</v-icon>
            Learn • Practice • Excel
          </v-chip>
        </div>
      </v-col>

      <!-- Right Side - Login Form -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card flat max-width="450" width="100%" class="pa-8">
          <!-- Mobile Logo -->
          <div class="text-center mb-6 d-md-none">
            <v-icon size="60" color="primary">mdi-code-braces</v-icon>
            <h2 class="text-h5 font-weight-bold mt-2">ITE 12 Learning</h2>
          </div>

          <div class="text-center mb-8">
            <h2 class="text-h4 font-weight-bold">Welcome Back!</h2>
            <p class="text-subtitle-1 text-grey">Sign in to continue learning</p>
          </div>

          <v-form @submit.prevent="handleLogin">
            <!-- Email Field -->
            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-email"
              type="email"
              variant="outlined"
              :rules="emailRules"
              :disabled="isLoading"
              class="mb-2"
            />

            <!-- Password Field -->
            <v-text-field
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              variant="outlined"
              :rules="passwordRules"
              :disabled="isLoading"
              @click:append-inner="showPassword = !showPassword"
              class="mb-2"
            />

            <!-- Remember Me & Forgot Password -->
            <div class="d-flex justify-space-between align-center mb-4">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                density="compact"
                hide-details
                :disabled="isLoading"
              />
              <v-btn variant="text" size="small" color="primary" :disabled="isLoading">
                Forgot password?
              </v-btn>
            </div>

            <!-- Error Message -->
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mb-4"
            >
              {{ errorMessage }}
            </v-alert>

            <!-- Login Button -->
            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="isLoading"
              class="mb-4"
            >
              Sign In
            </v-btn>

            <!-- Divider -->
            <v-divider class="my-4" />

            <!-- Register Link -->
            <div class="text-center">
              <span class="text-grey">Don't have an account?</span>
              <v-btn
                variant="text"
                color="primary"
                size="small"
                @click="goToRegister"
                :disabled="isLoading"
              >
                Sign Up
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
