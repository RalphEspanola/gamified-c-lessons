<script setup>
import { ref } from 'vue'

const streakDays = ref(7)
const longestStreak = ref(15)
</script>

<template>
  <v-col cols="12" sm="6" md="3">
    <v-card elevation="2" class="pa-4">
      <div class="d-flex align-center mb-3">
        <v-icon color="orange" size="32" class="mr-2">mdi-fire</v-icon>
        <div>
          <div class="text-caption text-grey">Current Streak</div>
          <div class="text-h5 font-weight-bold">{{ streakDays }} Days</div>
        </div>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="text-center mb-2">
        <v-icon color="orange" size="64">mdi-fire</v-icon>
      </div>

      <div class="text-caption text-grey text-center">
        Longest streak: <span class="font-weight-bold">{{ longestStreak }} days</span>
      </div>

      <div class="text-caption text-success text-center mt-2">Keep it up! 🎯</div>
    </v-card>
  </v-col>
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
