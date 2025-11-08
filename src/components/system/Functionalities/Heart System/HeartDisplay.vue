<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useHearts } from '@/composables/useHearts'

const { hearts, MAX_HEARTS, refillHearts, formattedTimeRemaining, canContinue } = useHearts()

let interval

onMounted(() => {
  refillHearts()
  // Check every second for heart refills
  interval = setInterval(() => {
    refillHearts()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="heart-container pa-3">
    <div class="d-flex align-center ga-2">
      <!-- Heart icons -->
      <div class="d-flex ga-1">
        <v-icon
          v-for="i in MAX_HEARTS"
          :key="i"
          :color="i <= hearts ? 'red' : 'grey-lighten-2'"
          size="x-large"
        >
          {{ i <= hearts ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </div>

      <!-- Heart count -->
      <span class="text-h6 font-weight-bold">{{ hearts }}/{{ MAX_HEARTS }}</span>
    </div>

    <!-- Refill timer -->
    <div v-if="hearts < MAX_HEARTS" class="text-caption text-grey mt-1">
      <v-icon size="small" class="mr-1">mdi-timer-outline</v-icon>
      Next heart in: {{ formattedTimeRemaining }}
    </div>

    <!-- No hearts warning -->
    <v-alert v-if="!canContinue" type="warning" variant="tonal" class="mt-2" density="compact">
      Out of hearts! Wait {{ formattedTimeRemaining }} or practice previous lessons.
    </v-alert>
  </div>
</template>

<style scoped>
.heart-container {
  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
  border-radius: 12px;
  border: 2px solid #ffcdd2;
}
</style>
