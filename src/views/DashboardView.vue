<script setup>
import TopNavbar from '@/components/layout/TopNavbar.vue'
import LevelXpCard from '@/components/system/Dashboard/LevelXpCard.vue'
import LearningProgressCard from '@/components/system/Dashboard/LearningProgressCard.vue'
import StreakDaysCard from '@/components/system/Dashboard/StreakDaysCard.vue'
import LearningPathCard from '@/components/system/Dashboard/LearningPathCard.vue'
import PowerUps from '@/components/system/Dashboard/PowerUps.vue'

import { useAuth } from '@/composables/auth/useAuth'

const { currentUser } = useAuth()
</script>

<template>
  <TopNavbar />

  <v-container class="py-10 mt-15">
    <!-- Welcome Message -->
    <v-row class="mb-6 mt-2">
      <v-col cols="12">
        <div>
          <h1 class="text-h4 font-weight-bold mb-2">
            Welcome back, {{ currentUser?.user_metadata?.first_name || 'User' }}!
          </h1>
          <p class="text-subtitle-1 text-grey">Ready to continue your learning journey?</p>
        </div>
      </v-col>
    </v-row>

    <!-- Dashboard Cards -->
    <v-row>
      <v-col cols="12" md="4" class="d-flex">
        <!-- 🔹 No props needed - card handles its own data -->
        <LevelXpCard class="w-100" />
      </v-col>

      <v-col cols="12" md="4" class="d-flex">
        <LearningProgressCard class="w-100" />
      </v-col>

      <v-col cols="12" md="4" class="d-flex">
        <StreakDaysCard class="w-100" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <LearningPathCard />
      </v-col>

      <v-col cols="12" md="4">
        <PowerUps />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  height: 100%;
  width: 100%;
}
</style>
