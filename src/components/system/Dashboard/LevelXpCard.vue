<script setup>
import { ref } from 'vue'

const userLevel = ref(5)
const currentXP = ref(1250)
const xpToNextLevel = ref(2000)
const xpProgress = ref((currentXP.value / xpToNextLevel.value) * 100)
</script>
<template>
  <!-- Level & XP Card -->
  <v-col cols="12" sm="6" md="3">
    <v-card elevation="2" class="pa-4">
      <div class="d-flex align-center mb-3">
        <v-icon color="amber" size="32" class="mr-2">mdi-star-circle</v-icon>
        <div>
          <div class="text-caption text-grey">Level</div>
          <div class="text-h5 font-weight-bold">{{ userLevel }}</div>
        </div>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="mb-2">
        <div class="d-flex justify-space-between text-caption mb-1">
          <span>XP Progress</span>
          <span class="font-weight-bold">{{ currentXP }} / {{ xpToNextLevel }}</span>
        </div>
        <v-progress-linear
          :model-value="xpProgress"
          color="amber"
          height="8"
          rounded
        ></v-progress-linear>
      </div>

      <div class="text-caption text-grey text-center mt-2">
        {{ xpToNextLevel - currentXP }} XP to next level
      </div>
    </v-card>
  </v-col>
</template>
<style scoped>
.v-card {
  height: 100%;
}
</style>
