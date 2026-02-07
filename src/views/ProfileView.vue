<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const user = ref(null)
const loading = ref(true)

// Fetch authenticated user
const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    await supabase.auth.signOut()
    router.push('/login')
    return
  }

  const u = data.user

  user.value = {
    name: u.user_metadata?.name ?? 'User',
    email: u.email ?? '',
    role: u.user_metadata?.role ?? 'Student',
    joinedAt: new Date(u.created_at).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  }

  loading.value = false
}

onMounted(fetchUser)

// Initials fallback
const initials = computed(() => {
  if (!user.value?.name) return ''
  return user.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

// Edit profile
const editProfile = () => {
  console.log('Edit profile clicked')
}

// Go back to home
const goBack = () => {
  router.push('/')
}

// Logout
const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>
<template>
  <v-container v-if="!loading && user" style="max-width: 800px" class="py-10">
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

        <h2 class="mt-4 font-weight-bold">{{ user.name }}</h2>
        <p class="text-grey">{{ user.email }}</p>

        <v-chip color="primary" class="mt-2">
          {{ user.role }}
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
              {{ user.joinedAt }}
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
        <v-btn color="primary" variant="outlined" prepend-icon="mdi-pencil" @click="editProfile">
          Edit Profile
        </v-btn>

        <v-spacer />

        <v-btn color="red" variant="text" prepend-icon="mdi-logout" @click="logout"> Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
