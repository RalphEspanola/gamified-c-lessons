<script setup>
import { computed } from 'vue'
import { useLearningProgress } from '@/composables/system/useLearningProgress'

defineOptions({ inheritAttrs: false })

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
  <v-card class="w-100 h-100 pa-4" elevation="2" rounded="lg" v-bind="$attrs">
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
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
