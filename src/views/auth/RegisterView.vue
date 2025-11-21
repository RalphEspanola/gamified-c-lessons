<!-- RegisterView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth/useAuth'

const router = useRouter()
const { register, isLoading, errorMessage } = useAuth()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)

// Form validation rules
const nameRules = [
  (v) => !!v || 'Full name is required',
  (v) => v.length >= 3 || 'Name must be at least 3 characters',
]

const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v.length >= 6 || 'Password must be at least 6 characters',
  (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
  (v) => /[0-9]/.test(v) || 'Password must contain at least one number',
]

const confirmPasswordRules = [
  (v) => !!v || 'Please confirm your password',
  (v) => v === password.value || 'Passwords do not match',
]

const termsRules = [(v) => !!v || 'You must agree to the terms and conditions']

const handleRegister = async () => {
  if (!agreeToTerms.value) {
    return
  }

  const success = await register({
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  })

  if (success) {
    router.push('/')
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Left Side - Branding -->
      <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center primary">
        <div class="text-center pa-8">
          <v-icon size="120" color="white" class="mb-4">mdi-account-plus</v-icon>
          <h1 class="text-h2 font-weight-bold white--text mb-4">Join Us Today</h1>
          <p class="text-h6 white--text">Start your journey to mastering C Programming</p>
          <div class="mt-6">
            <v-chip color="white" class="ma-2">
              <v-icon start>mdi-heart</v-icon>
              Hearts System
            </v-chip>
            <v-chip color="white" class="ma-2">
              <v-icon start>mdi-trophy</v-icon>
              Achievements
            </v-chip>
            <v-chip color="white" class="ma-2">
              <v-icon start>mdi-chart-line</v-icon>
              Progress Tracking
            </v-chip>
          </div>
        </div>
      </v-col>

      <!-- Right Side - Register Form -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card flat max-width="500" width="100%" class="pa-8">
          <!-- Mobile Logo -->
          <div class="text-center mb-6 d-md-none">
            <v-icon size="60" color="primary">mdi-code-braces</v-icon>
            <h2 class="text-h5 font-weight-bold mt-2">ITE 12 Learning</h2>
          </div>

          <div class="text-center mb-8">
            <h2 class="text-h4 font-weight-bold">Create Account</h2>
            <p class="text-subtitle-1 text-grey">Fill in your details to get started</p>
          </div>

          <v-form @submit.prevent="handleRegister">
            <!-- Full Name Field -->
            <v-text-field
              v-model="fullName"
              label="Full Name"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              :rules="nameRules"
              :disabled="isLoading"
              class="mb-2"
            />

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

            <!-- Confirm Password Field -->
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              prepend-inner-icon="mdi-lock-check"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              variant="outlined"
              :rules="confirmPasswordRules"
              :disabled="isLoading"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              class="mb-2"
            />

            <!-- Terms and Conditions -->
            <v-checkbox
              v-model="agreeToTerms"
              :rules="termsRules"
              :disabled="isLoading"
              class="mb-2"
            >
              <template #label>
                <div>
                  I agree to the
                  <v-btn variant="text" size="small" color="primary" class="pa-0">
                    Terms and Conditions
                  </v-btn>
                </div>
              </template>
            </v-checkbox>

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

            <!-- Register Button -->
            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="isLoading"
              :disabled="!agreeToTerms"
              class="mb-4"
            >
              Create Account
            </v-btn>

            <!-- Divider -->
            <v-divider class="my-4" />

            <!-- Login Link -->
            <div class="text-center">
              <span class="text-grey">Already have an account?</span>
              <v-btn
                variant="text"
                color="primary"
                size="small"
                @click="goToLogin"
                :disabled="isLoading"
              >
                Sign In
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
