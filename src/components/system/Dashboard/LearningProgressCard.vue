<script setup>
import { computed } from 'vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'

// Get topics and reactive lessons
const { topics } = useLearningProgress()

// Compute total lessons and completed lessons
const totalLessons = computed(() =>
  topics.value.reduce((sum, topic) => sum + topic.lessons.length, 0),
)

const completedLessons = computed(() =>
  topics.value.reduce(
    (sum, topic) => sum + topic.lessons.filter((l) => l.status === 'completed').length,
    0,
  ),
)

// Compute percentage
const percentage = computed(() => {
  if (totalLessons.value === 0) return 0
  return Math.round((completedLessons.value / totalLessons.value) * 100)
})
</script>

<template>
  <v-col cols="12" sm="6" md="3">
    <v-card elevation="2" class="pa-4">
      <div class="d-flex align-center mb-3">
        <v-icon color="blue" size="32" class="mr-2">mdi-book-open-variant</v-icon>
        <div>
          <div class="text-caption text-grey">Learning Progress</div>
          <div class="text-h5 font-weight-bold">{{ percentage }}%</div>
        </div>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="mb-2">
        <v-progress-circular
          :model-value="percentage"
          :size="80"
          :width="8"
          color="blue"
          class="d-block mx-auto"
        >
          <span class="text-h6 font-weight-bold mt-5 ml-2">{{ percentage }}%</span>
        </v-progress-circular>
      </div>

      <div class="text-caption text-grey text-center mt-3">
        {{ completedLessons }} of {{ totalLessons }} lessons completed
      </div>
    </v-card>
  </v-col>
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
