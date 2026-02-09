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
  <div class="auth-page">
    <!-- Floating Shapes Background -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <!-- Main Container -->
    <v-container class="auth-container fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6" xl="5">
          <v-card class="auth-card" elevation="24" rounded="xl">
            <!-- Header -->
            <div class="auth-header">
              <div class="icon-wrapper">
                <v-avatar size="80" class="gradient-avatar">
                  <v-icon size="50" color="white">mdi-account-plus</v-icon>
                </v-avatar>
              </div>
              <h1 class="auth-title">Create Your Account</h1>
              <p class="auth-subtitle">Join us and start your coding journey today</p>
            </div>

            <!-- Form -->
            <v-form class="auth-form" @submit.prevent="handleRegister">
              <!-- Success Alert -->
              <v-alert v-if="successMessage" type="success" variant="tonal" class="mb-4" prominent>
                <v-icon start size="large">mdi-check-circle</v-icon>
                {{ successMessage }}
              </v-alert>

              <!-- Error Alert -->
              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                class="mb-4"
                closable
                @click:close="errorMessage = ''"
              >
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
                label="Email Address"
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
                persistent-hint
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
                size="x-large"
                block
                :loading="loading"
                class="gradient-button mb-4"
                elevation="8"
              >
                Create Account
              </v-btn>

              <!-- Features Grid -->
              <div class="features-grid">
                <div class="feature-item">
                  <v-icon color="primary" size="32">mdi-school</v-icon>
                  <span>Interactive Learning</span>
                </div>
                <div class="feature-item">
                  <v-icon color="primary" size="32">mdi-trophy</v-icon>
                  <span>Earn Rewards</span>
                </div>
                <div class="feature-item">
                  <v-icon color="primary" size="32">mdi-chart-line</v-icon>
                  <span>Track Progress</span>
                </div>
              </div>

              <!-- Divider -->
              <div class="auth-divider">
                <v-divider />
                <span class="divider-text">or</span>
                <v-divider />
              </div>

              <!-- Footer -->
              <div class="auth-footer">
                <p class="text-body-2 mb-2" style="color: #666">
                  Already have an account?
                  <v-btn
                    variant="text"
                    color="primary"
                    to="/login"
                    :disabled="loading"
                    class="text-none px-1"
                    style="font-weight: 600"
                  >
                    Sign In
                  </v-btn>
                </p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

/* Floating Shapes Animation */
.floating-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  right: -150px;
  animation-delay: 5s;
}

.shape-3 {
  width: 250px;
  height: 250px;
  top: 40%;
  right: 5%;
  animation-delay: 10s;
}

.shape-4 {
  width: 180px;
  height: 180px;
  bottom: 30%;
  left: 10%;
  animation-delay: 15s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.auth-container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 24px;
}

.fill-height {
  min-height: 100vh;
}

/* Card Styles */
.auth-card {
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.icon-wrapper {
  margin-bottom: 16px;
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.gradient-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
}

.auth-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.auth-subtitle {
  color: #666;
  font-size: 15px;
}

.auth-form {
  margin-top: 24px;
}

.gradient-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  font-size: 16px;
  transition: all 0.3s ease;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
}

.auth-divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  gap: 16px;
}

.divider-text {
  color: #999;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
}

.auth-footer {
  text-align: center;
  margin-top: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.feature-item span {
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

/* Responsive */
@media (max-width: 960px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

@media (max-width: 600px) {
  .auth-card {
    padding: 32px 24px;
  }
  .auth-title {
    font-size: 26px;
  }
  .auth-subtitle {
    font-size: 13px;
  }
  .features-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 400px) {
  .auth-container {
    padding: 16px;
  }
  .auth-card {
    padding: 24px 16px;
  }
}
</style>
