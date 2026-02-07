<script setup>
import CoinsDisplay from '../system/Shop/CoinsDisplay.vue'
import UserAvatar from '../system/user/UserAvatar.vue'

// temporary user info

const navItems = [
  { title: 'Dashboard', path: '/', icon: 'mdi-view-dashboard' },
  // { title: 'Lessons', path: '/lessons', icon: 'mdi-format-list-bulleted' },
  { title: 'Shop', path: '/shop', icon: 'mdi-store', badge: 'NEW' },
  // { title: 'Achievements', path: '/achievements', icon: 'mdi-trophy' },
  // { title: 'Leaderboard', path: '/leaderboard', icon: 'mdi-chart-bar' },
]
</script>

<template>
  <!-- APP BAR -->
  <v-app-bar app color="primary" dark flat class="mb-10">
    <v-toolbar-title class="text-h6 font-weight-bold"> Learn ITE 12</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Navigation Tabs -->
    <v-tabs centered color="white" slider-color="white">
      <v-tab v-for="item in navItems" :key="item.path" :to="item.path" :prepend-icon="item.icon">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <!-- User info -->
    <UserAvatar />

    <CoinsDisplay class="mr-4" />
    <!-- Logout Button
    <v-btn icon @click="console.log('logout clicked')">
      <v-icon>mdi-logout</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<style scoped>
.v-toolbar-title {
  cursor: pointer;
}
</style>
