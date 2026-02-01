<script setup>
import { computed } from 'vue'
import { useXP } from '@/composables/system/useXP'

defineOptions({ inheritAttrs: false })

// Use your global XP composable
const { xp, level, xpToNextLevel, xpProgress } = useXP()

// Optional: progress for Vuetify expects a number between 0-100
const progressValue = computed(() => xpProgress.value)
</script>

<template>
  <v-card class="w-100 h-100 pa-4" elevation="2" rounded="lg" v-bind="$attrs">
    <!-- Level -->
    <div class="d-flex align-center mb-3">
      <v-icon color="amber" size="32" class="mr-2">mdi-star-circle</v-icon>
      <div>
        <div class="text-caption text-grey">Level</div>
        <div class="text-h5 font-weight-bold">{{ level }}</div>
      </div>
    </div>

    <v-divider class="my-3" />

    <!-- XP Progress -->
    <div class="mb-2">
      <div class="d-flex justify-space-between text-caption mb-1">
        <span>XP Progress</span>
        <span class="font-weight-bold">{{ xp }} / {{ xpToNextLevel }}</span>
      </div>

      <!-- Vuetify progress bar -->
      <v-progress-linear :model-value="progressValue" color="amber" height="8" rounded striped />
    </div>

    <div class="text-caption text-grey text-center mt-2">
      {{ xpToNextLevel - xp }} XP to next level
    </div>
  </v-card>
</template>
