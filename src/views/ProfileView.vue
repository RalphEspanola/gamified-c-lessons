<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/auth/useAuth'

const router = useRouter()
const { currentUser, signOut } = useAuth()
const loading = ref(true)

// User display data
const userData = computed(() => {
  if (!currentUser.value) return null

  const u = currentUser.value

  return {
    name: u.user_metadata?.first_name
      ? `${u.user_metadata.first_name} ${u.user_metadata?.last_name || ''}`.trim()
      : u.user_metadata?.name || 'User',
    email: u.email || '',
    role: u.user_metadata?.role || 'Student',
    joinedAt: new Date(u.created_at).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  }
})

onMounted(() => {
  // Check if user exists
  if (!currentUser.value) {
    router.push('/login')
    return
  }
  loading.value = false
})

// Initials fallback
const initials = computed(() => {
  if (!userData.value?.name) return ''
  return userData.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

// Go back to home
const goBack = () => {
  router.push('/')
}

// Logout
const handleLogout = async () => {
  await signOut()
  router.push('/login')
}
</script>

<template>
  <v-container v-if="!loading && userData" style="max-width: 800px" class="py-10">
    <!-- Back Button -->
    <v-btn variant="text" prepend-icon="mdi-arrow-left" class="mb-4" @click="goBack">
      Back to Home
    </v-btn>

    <v-card elevation="4" rounded="xl">
      <!-- Header -->
      <v-card-text class="text-center py-8">
        <v-avatar size="100" color="deep-purple-accent-4">
          <span class="text-white text-h4 font-weight-bold">
            {{ initials }}
          </span>
        </v-avatar>

        <h2 class="mt-4 font-weight-bold">{{ userData.name }}</h2>
        <p class="text-grey">{{ userData.email }}</p>

        <v-chip color="primary" class="mt-2">
          {{ userData.role }}
        </v-chip>
      </v-card-text>

      <v-divider />

      <!-- Info Section -->
      <v-card-text class="px-8">
        <v-list density="comfortable">
          <v-list-item>
            <template #prepend>
              <v-icon>mdi-calendar</v-icon>
            </template>
            <v-list-item-title> Joined </v-list-item-title>
            <v-list-item-subtitle>
              {{ userData.joinedAt }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-icon>mdi-school</v-icon>
            </template>
            <v-list-item-title> Course </v-list-item-title>
            <v-list-item-subtitle> Learn ITE 12 </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider />

      <!-- Actions -->
      <v-card-actions class="px-8 py-6">
        <v-spacer />
        <v-btn color="red" variant="text" prepend-icon="mdi-logout" @click="handleLogout">
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <!-- Loading State -->
  <v-container v-else class="d-flex justify-center align-center" style="min-height: 400px">
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-container>
</template>
