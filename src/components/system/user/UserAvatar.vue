<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Temporary user info (replace with Supabase later)
const user = ref({
  name: 'Ralph Española',
})

// Generate initials
const initials = computed(() => {
  if (!user.value.name) return ''
  return user.value.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
})

// Menu state
const menu = ref(false)

// Actions
function goToProfile() {
  menu.value = false
  router.push('/profile')
}

function logout() {
  menu.value = false
  console.log('Logout clicked')
  // later:
  // await supabase.auth.signOut()
  // router.push('/login')
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
        <v-list-item-title class="text-red"> Logout </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
