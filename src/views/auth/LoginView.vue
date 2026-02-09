<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import { useAuthState } from '@/composables/auth/useAuthState'

const router = useRouter()
const { initAuth } = useAuthState()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    // Re-initialize auth state after login
    await initAuth()

    // Redirect to dashboard
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Failed to login. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card elevation="8" rounded="xl" class="pa-4">
          <v-card-title class="text-center text-h4 font-weight-bold mb-4">
            Welcome Back
          </v-card-title>

          <v-card-subtitle class="text-center mb-6">
            Sign in to continue your learning journey
          </v-card-subtitle>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <!-- Error Alert -->
              <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable>
                {{ errorMessage }}
              </v-alert>

              <!-- Email Field -->
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                :disabled="loading"
                required
                class="mb-3"
              />

              <!-- Password Field -->
              <v-text-field
                v-model="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                :disabled="loading"
                required
                class="mb-4"
              />

              <!-- Login Button -->
              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                class="mb-4"
              >
                Sign In
              </v-btn>

              <!-- Register Link -->
              <div class="text-center">
                <span class="text-grey">Don't have an account?</span>
                <v-btn variant="text" color="primary" to="/register" :disabled="loading">
                  Sign Up
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
