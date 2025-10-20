<script setup>
import { ref } from 'vue'

const learningProgress = ref({
  completedLessons: 12,
  totalLessons: 20,
  percentage: 60,
})
</script>

<template>
  <v-col cols="12" sm="6" md="3">
    <v-card elevation="2" class="pa-4">
      <div class="d-flex align-center mb-3">
        <v-icon color="blue" size="32" class="mr-2">mdi-book-open-variant</v-icon>
        <div>
          <div class="text-caption text-grey">Learning Progress</div>
          <div class="text-h5 font-weight-bold">{{ learningProgress.percentage }}%</div>
        </div>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="mb-2">
        <v-progress-circular
          :model-value="learningProgress.percentage"
          :size="80"
          :width="8"
          color="blue"
          class="d-block mx-auto"
        >
          <span class="text-h6 font-weight-bold mt-5 ml-2">{{ learningProgress.percentage }}%</span>
        </v-progress-circular>
      </div>

      <div class="text-caption text-grey text-center mt-3">
        {{ learningProgress.completedLessons }} of {{ learningProgress.totalLessons }} lessons
        completed
      </div>
    </v-card>
  </v-col>
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
