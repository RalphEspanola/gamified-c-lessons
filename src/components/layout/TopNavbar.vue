<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CoinsDisplay from '../system/Shop/CoinsDisplay.vue'
import UserAvatar from '../system/user/UserAvatar.vue'
import { useAuth } from '@/composables/auth/useAuth'

const router = useRouter()
const { currentUser } = useAuth()

const drawer = ref(false)

const navItems = [
  { title: 'Dashboard', path: '/', icon: 'mdi-view-dashboard' },
  { title: 'Shop', path: '/shop', icon: 'mdi-store', badge: 'NEW' },
  { title: 'Leaderboard', path: '/leaderboard', icon: 'mdi-trophy' },
]
</script>

<template>
  <!-- Desktop Navigation -->
  <v-app-bar app flat class="navbar-gradient" height="72" elevation="8">
    <v-container fluid class="d-flex align-center px-4">
      <!-- Logo -->
      <div class="navbar-logo" @click="router.push('/')">
        <v-avatar size="40" class="gradient-icon mr-3">
          <v-icon color="white" size="24">mdi-school</v-icon>
        </v-avatar>
        <span class="logo-text d-none d-sm-flex">Learn ITE 12</span>
      </div>

      <v-spacer />

      <!-- Navigation Items (Desktop) -->
      <div class="nav-items d-none d-md-flex">
        <v-btn
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          variant="text"
          size="large"
        >
          <v-icon start size="20">{{ item.icon }}</v-icon>
          {{ item.title }}
          <v-badge v-if="item.badge" :content="item.badge" color="amber" class="ml-2" inline />
        </v-btn>
      </div>

      <v-spacer />

      <!-- Right Side Actions -->
      <div class="navbar-actions d-flex align-center gap-3">
        <!-- Coins Display -->
        <CoinsDisplay />

        <!-- User Avatar -->
        <UserAvatar />

        <!-- Mobile Menu Button -->
        <v-btn icon variant="text" class="d-md-none" @click="drawer = !drawer">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    width="280"
    class="mobile-drawer"
  >
    <!-- User Info Header -->
    <div class="drawer-header">
      <v-avatar size="64" class="gradient-icon mb-3">
        <v-icon color="white" size="32">mdi-account</v-icon>
      </v-avatar>
      <div class="text-h6 font-weight-bold">
        {{ currentUser?.user_metadata?.first_name || 'User' }}
      </div>
      <div class="text-caption text-grey">
        {{ currentUser?.email }}
      </div>
    </div>

    <v-divider />

    <!-- Navigation List -->
    <v-list density="compact" class="py-2">
      <v-list-item
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :prepend-icon="item.icon"
        class="mobile-nav-item"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <template v-if="item.badge" #append>
          <v-chip color="amber" size="x-small">{{ item.badge }}</v-chip>
        </template>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-4">
        <v-btn block variant="outlined" color="deep-purple" prepend-icon="mdi-logout">
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
/* Gradient Navbar */
.navbar-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3) !important;
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.gradient-icon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
}

/* Navigation Items */
.nav-items {
  gap: 8px;
}

.nav-item {
  color: rgba(255, 255, 255, 0.9) !important;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 12px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
}

.nav-item.v-btn--active {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

.nav-item.v-btn--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: white;
  border-radius: 2px 2px 0 0;
}

/* Navbar Actions */
.navbar-actions {
  gap: 12px;
}

/* Mobile Drawer */
.mobile-drawer {
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.drawer-header {
  padding: 32px 24px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mobile-nav-item {
  border-radius: 12px;
  margin: 4px 8px;
  transition: all 0.2s ease;
}

.mobile-nav-item:hover {
  background: rgba(102, 126, 234, 0.1);
}

.mobile-nav-item.v-list-item--active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  color: #667eea;
}

/* Responsive */
@media (max-width: 960px) {
  .navbar-logo {
    flex-shrink: 0;
  }
}

@media (max-width: 600px) {
  .logo-text {
    display: none !important;
  }
}
</style>
