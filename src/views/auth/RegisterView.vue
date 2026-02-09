<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import { useAuthState } from '@/composables/auth/useAuthState'

const router = useRouter()
const { initAuth } = useAuthState()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = async () => {
  // Validation
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: firstName.value,
          last_name: lastName.value,
          role: 'Student',
        },
      },
    })

    if (error) throw error

    // Check if email confirmation is required
    if (data?.user?.identities?.length === 0) {
      errorMessage.value = 'This email is already registered. Please login instead.'
      return
    }

    successMessage.value = 'Account created successfully! Redirecting...'

    // Re-initialize auth state
    await initAuth()

    // Redirect to dashboard after short delay
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    console.error('Registration error:', error)
    errorMessage.value = error.message || 'Failed to create account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card elevation="8" rounded="xl" class="pa-4">
          <v-card-title class="text-center text-h4 font-weight-bold mb-4">
            Create Account
          </v-card-title>

          <v-card-subtitle class="text-center mb-6">
            Join us and start your learning journey
          </v-card-subtitle>

          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <!-- Success Alert -->
              <v-alert v-if="successMessage" type="success" variant="tonal" class="mb-4">
                {{ successMessage }}
              </v-alert>

              <!-- Error Alert -->
              <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable>
                {{ errorMessage }}
              </v-alert>

              <!-- Name Fields -->
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="firstName"
                    label="First Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    :disabled="loading"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="lastName"
                    label="Last Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    :disabled="loading"
                    required
                  />
                </v-col>
              </v-row>

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
                hint="At least 8 characters"
                class="mb-3"
              />

              <!-- Confirm Password Field -->
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                :type="showConfirmPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-check"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                variant="outlined"
                :disabled="loading"
                required
                class="mb-4"
              />

              <!-- Register Button -->
              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                class="mb-4"
              >
                Create Account
              </v-btn>

              <!-- Login Link -->
              <div class="text-center">
                <span class="text-grey">Already have an account?</span>
                <v-btn variant="text" color="primary" to="/login" :disabled="loading">
                  Sign In
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
