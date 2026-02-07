<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'

import { useRegister } from '@/composables/auth/register'
import { ref } from 'vue'

const { formData, formAction, refVForm, onFormSubmit } = useRegister()

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card max-width="520" width="100%" elevation="10" rounded="xl" class="pa-6">
      <!-- Header -->
      <div class="text-center mb-6">
        <v-avatar size="64" color="red-darken-4" class="mb-3">
          <v-icon size="36" color="white">mdi-account-plus</v-icon>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold">Create an Account</h2>
        <p class="text-body-2 text-grey">Join and start tracking your progress</p>
      </div>

      <!-- Success Message -->
      <v-alert
        v-if="formAction.formSuccessMessage"
        type="success"
        variant="tonal"
        density="compact"
        class="mb-4"
      >
        {{ formAction.formSuccessMessage }}
      </v-alert>

      <!-- Error Message -->
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
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.firstname"
              label="First name"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              :rules="[requiredValidator]"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.lastname"
              label="Last name"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              :rules="[requiredValidator]"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
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
              :rules="[requiredValidator, passwordValidator]"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="formData.password_confirmation"
              label="Confirm password"
              prepend-inner-icon="mdi-lock-check"
              :type="isPasswordConfirmVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
              variant="outlined"
              :rules="[
                requiredValidator,
                confirmedValidator(formData.password_confirmation, formData.password),
              ]"
            />
          </v-col>
        </v-row>

        <v-btn
          type="submit"
          color="red-darken-4"
          size="large"
          prepend-icon="mdi-account-plus"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
          block
          class="mt-4"
        >
          Create Account
        </v-btn>

        <!-- Footer -->
        <div class="text-center mt-4">
          <span class="text-body-2 text-grey">Already have an account?</span>
          <v-btn variant="text" color="red-darken-4" size="small" @click="router.push('/login')">
            Sign in
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
