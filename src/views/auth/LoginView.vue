<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'

import { useLogin } from '@/composables/auth/login'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { refVForm, formData, formAction, onFormSubmit } = useLogin()

const isPasswordVisible = ref(false)

// Redirect on success
watch(
  () => formAction.formSuccessMessage,
  (val) => {
    if (val) {
      setTimeout(() => {
        router.push('/')
      }, 500)
    }
  },
)
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card max-width="480" width="100%" elevation="10" rounded="xl" class="pa-6">
      <!-- Header -->
      <div class="text-center mb-6">
        <v-avatar size="64" color="red-darken-4" class="mb-3">
          <v-icon size="36" color="white">mdi-login</v-icon>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold">Welcome Back</h2>
        <p class="text-body-2 text-grey">Sign in to continue learning</p>
      </div>

      <!-- Success -->
      <v-alert
        v-if="formAction.formSuccessMessage"
        type="success"
        variant="tonal"
        density="compact"
        class="mb-4"
      >
        {{ formAction.formSuccessMessage }}
      </v-alert>

      <!-- Error -->
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
      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-text-field
          v-model="formData.email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="[requiredValidator, emailValidator]"
          class="mb-3"
        />

        <v-text-field
          v-model="formData.password"
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          variant="outlined"
          :rules="[requiredValidator]"
          class="mb-3"
        />

        <v-btn
          type="submit"
          color="red-darken-4"
          size="large"
          prepend-icon="mdi-login"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
          block
          class="mt-2"
        >
          Sign In
        </v-btn>

        <!-- Footer -->
        <div class="text-center mt-4">
          <span class="text-body-2 text-grey">Don't have an account?</span>
          <v-btn variant="text" color="red-darken-4" size="small" @click="router.push('/register')">
            Create one
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
