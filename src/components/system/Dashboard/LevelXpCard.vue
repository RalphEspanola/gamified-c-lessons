<script setup>
import { computed, onMounted } from 'vue'
import { useXP } from '@/composables/system/useXP'

defineOptions({ inheritAttrs: false })

const {
  xp,
  level,
  xpNeededForNextLevel,
  xpProgressInLevel,
  xpProgressPercentage,
  xpRemainingToNextLevel,
  initializeXP,
} = useXP()

onMounted(async () => {
  await initializeXP()
})
</script>

<template>
  <v-card class="w-100 h-100 pa-4" elevation="2" rounded="lg" v-bind="$attrs">
    <div class="d-flex align-center mb-3">
      <v-icon color="amber" size="32" class="mr-2">mdi-star-circle</v-icon>
      <div>
        <div class="text-caption text-grey">Level</div>
        <div class="text-h5 font-weight-bold">{{ level }}</div>
      </div>
    </div>

    <v-divider class="my-3" />

    <div class="mb-2">
      <div class="d-flex justify-space-between text-caption mb-1">
        <span>XP Progress</span>
        <span class="font-weight-bold">{{ xpProgressInLevel }} / {{ xpNeededForNextLevel }}</span>
      </div>

      <v-progress-linear
        :model-value="xpProgressPercentage"
        color="amber"
        height="8"
        rounded
        striped
      />
    </div>

    <div class="text-caption text-grey text-center mt-2">
      {{ xpRemainingToNextLevel }} XP to level {{ level + 1 }}
    </div>

    <div class="text-caption text-grey text-center mt-1">Total XP: {{ xp }}</div>
  </v-card>
</template>
