<script setup>
import { useRouter } from 'vue-router'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { useRegister } from '@/composables/auth/register'
import { ref } from 'vue'

const router = useRouter()
const { formData, formAction, refVForm, onFormSubmit } = useRegister()

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
</script>

<template>
  <div class="auth-page">
    <!-- Decorative Background -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <v-container fluid class="auth-container">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="10" md="9" lg="6" xl="5">
          <v-card class="auth-card" elevation="24" rounded="xl">
            <!-- Header -->
            <div class="auth-header">
              <div class="icon-wrapper">
                <v-avatar size="72" class="gradient-avatar">
                  <v-icon size="40" color="white">mdi-rocket-launch</v-icon>
                </v-avatar>
              </div>
              <h1 class="auth-title">Start Your Journey</h1>
              <p class="auth-subtitle">Create an account and begin learning today</p>
            </div>

            <!-- Alerts -->
            <v-alert
              v-if="formAction.formSuccessMessage"
              type="success"
              variant="tonal"
              density="compact"
              class="mb-4"
            >
              {{ formAction.formSuccessMessage }}
            </v-alert>

            <v-alert
              v-if="formAction.formErrorMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mb-4"
            >
              {{ formAction.formErrorMessage }}
            </v-alert>

            <!-- Form -->
            <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="auth-form">
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.firstname"
                    label="First Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    color="deep-purple"
                    :rules="[requiredValidator]"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.lastname"
                    label="Last Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    color="deep-purple"
                    :rules="[requiredValidator]"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.email"
                    label="Email Address"
                    type="email"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    color="deep-purple"
                    :rules="[requiredValidator, emailValidator]"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.password"
                    label="Password"
                    prepend-inner-icon="mdi-lock-outline"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    variant="outlined"
                    color="deep-purple"
                    :rules="[requiredValidator, passwordValidator]"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.password_confirmation"
                    label="Confirm Password"
                    prepend-inner-icon="mdi-lock-check"
                    :type="isPasswordConfirmVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
                    variant="outlined"
                    color="deep-purple"
                    :rules="[
                      requiredValidator,
                      confirmedValidator(formData.password_confirmation, formData.password),
                    ]"
                  />
                </v-col>
              </v-row>

              <v-btn
                type="submit"
                class="gradient-button mt-4"
                size="x-large"
                :loading="formAction.formProcess"
                :disabled="formAction.formProcess"
                block
                elevation="8"
              >
                <v-icon start>mdi-account-plus</v-icon>
                Create Account
              </v-btn>

              <!-- Divider -->
              <div class="auth-divider">
                <v-divider />
                <span class="divider-text">or</span>
                <v-divider />
              </div>

              <!-- Footer -->
              <div class="auth-footer">
                <span class="text-body-2">Already have an account?</span>
                <v-btn
                  variant="outlined"
                  color="deep-purple"
                  size="small"
                  class="ml-2"
                  @click="router.push('/login')"
                >
                  Sign In
                </v-btn>
              </div>
            </v-form>

            <!-- Features -->
            <div class="features-grid mt-6">
              <div class="feature-item">
                <v-icon color="deep-purple" size="24">mdi-trophy</v-icon>
                <span>Track Progress</span>
              </div>
              <div class="feature-item">
                <v-icon color="deep-purple" size="24">mdi-lightning-bolt</v-icon>
                <span>Earn XP</span>
              </div>
              <div class="feature-item">
                <v-icon color="deep-purple" size="24">mdi-fire</v-icon>
                <span>Build Streaks</span>
              </div>
            </div>
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
