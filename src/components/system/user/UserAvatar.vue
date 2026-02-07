<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()

// User state
const user = ref(null)

// Menu state
const menu = ref(false)

// Fetch the authenticated user on mount
const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    // Not logged in → redirect to login
    router.push('/login')
    return
  }

  const u = data.user

  user.value = {
    name: u.user_metadata?.name ?? 'User',
    email: u.email,
    role: u.user_metadata?.role ?? 'Student',
  }
}

onMounted(fetchUser)

// Generate initials
const initials = computed(() => {
  if (!user.value?.name) return ''
  return user.value.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
})

// Actions
const goToProfile = () => {
  menu.value = false
  router.push('/profile')
}

const logout = async () => {
  menu.value = false
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <v-menu v-model="menu" location="bottom end">
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="deep-purple-accent-4">
          <span class="text-white text-subtitle-2 font-weight-bold">
            {{ initials }}
          </span>
        </v-avatar>
      </v-btn>
    </template>

    <v-list min-width="180">
      <v-list-item @click="goToProfile">
        <template #prepend>
          <v-icon>mdi-account</v-icon>
        </template>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item @click="logout">
        <template #prepend>
          <v-icon color="red">mdi-logout</v-icon>
        </template>
        <v-list-item-title class="text-red">Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
