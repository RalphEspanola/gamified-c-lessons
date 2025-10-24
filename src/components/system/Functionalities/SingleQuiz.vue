<script setup>
import { ref } from 'vue'

const props = defineProps({
  quiz: {
    type: Object,
    required: true,
  },
})

const selected = ref('')
const feedback = ref('')

function checkAnswer(option) {
  selected.value = option
  feedback.value =
    option === props.quiz.answer ? '✅ Correct! Great job!' : '❌ Not quite. Try again!'
}
</script>

<template>
  <div>
    <h3 class="text-h6 mb-4">❓ {{ quiz.question }}</h3>
    <v-btn
      v-for="option in quiz.options"
      :key="option"
      class="ma-2"
      variant="outlined"
      size="large"
      :color="selected === option ? (option === quiz.answer ? 'success' : 'error') : 'primary'"
      @click="checkAnswer(option)"
      style="text-transform: none"
    >
      {{ option }}
    </v-btn>
    <v-alert
      v-if="feedback"
      :type="feedback.includes('✅') ? 'success' : 'error'"
      class="mt-4"
      variant="tonal"
    >
      {{ feedback }}
    </v-alert>
  </div>
</template>

<style scoped>
/* Ensure buttons don't transform text to uppercase */
:deep(.v-btn) {
  text-transform: none !important;
}
</style>
