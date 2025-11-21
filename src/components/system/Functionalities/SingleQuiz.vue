<script setup>
import { ref } from 'vue'
import { useShop } from '@/composables/system/useShop'
import { useAnswerProtection } from '@/composables/PowerUps/useAnswerProtection'

const props = defineProps({
  quiz: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['wrong-answer', 'correct-answer', 'use-hint'])

const selected = ref('')
const feedback = ref('')
const protectionTriggered = ref(false)

// Shop and power-ups
const { coins, powerUps, usePowerUp } = useShop()
const { isProtectionActive, useProtection } = useAnswerProtection()

function checkAnswer(option) {
  selected.value = option
  const isCorrect = option === props.quiz.answer
  protectionTriggered.value = false

  if (isCorrect) {
    feedback.value = '✅ Correct! Great job!'
    emit('correct-answer')
  } else {
    // Try to use answer protection
    const wasProtected = useProtection()

    if (wasProtected) {
      protectionTriggered.value = true
      feedback.value = '🛡️ Answer Protection saved you! No heart lost.'
      // Don't emit wrong-answer to prevent heart loss
    } else {
      feedback.value = '❌ Not quite. Try again!'
      emit('wrong-answer')
    }
  }
}

function useHintPowerUp() {
  const success = usePowerUp('hintReveal')

  if (success) {
    // Emit event so parent can handle showing hint
    emit('use-hint', {
      quizType: 'single',
      hint: `The correct answer starts with "${props.quiz.answer.charAt(0)}"`,
    })
    feedback.value = `💡 Hint: The answer starts with "${props.quiz.answer.charAt(0)}"`
  } else {
    feedback.value = "⚠️ You don't have any Hint Reveal power-ups!"
  }
}
</script>

<template>
  <div>
    <!-- Protection Active Banner -->
    <v-alert v-if="isProtectionActive" type="info" variant="tonal" density="compact" class="mb-3">
      <div class="d-flex align-center gap-2">
        <v-icon size="small">mdi-shield-heart</v-icon>
        <span class="text-caption">Answer Protection Active</span>
      </div>
    </v-alert>

    <h3 class="text-h6 mb-4">❓ {{ quiz.question }}</h3>

    <!-- Answer options -->
    <v-btn
      v-for="option in quiz.options"
      :key="option"
      class="ma-2"
      variant="outlined"
      size="large"
      :color="
        selected === option
          ? option === quiz.answer
            ? 'success'
            : protectionTriggered
              ? 'info'
              : 'error'
          : 'primary'
      "
      @click="checkAnswer(option)"
      style="text-transform: none"
      :disabled="!!selected"
    >
      {{ option }}
      <v-icon v-if="selected === option && protectionTriggered" end size="small">
        mdi-shield-check
      </v-icon>
    </v-btn>

    <!-- Power-up Buttons -->
    <div class="mt-4 d-flex gap-2 flex-wrap">
      <v-btn
        v-if="powerUps.hintReveal > 0"
        color="purple"
        variant="tonal"
        size="small"
        @click="useHintPowerUp"
        :disabled="!!selected"
      >
        <v-icon start size="small">mdi-lightbulb-on</v-icon>
        Use Hint ({{ powerUps.hintReveal }})
      </v-btn>
    </div>

    <!-- Feedback / Revealed Answer -->
    <v-alert
      v-if="feedback"
      :type="
        feedback.includes('✅')
          ? 'success'
          : feedback.includes('🛡️')
            ? 'info'
            : feedback.includes('💡')
              ? 'info'
              : 'error'
      "
      class="mt-4"
      variant="tonal"
    >
      {{ feedback }}
    </v-alert>
  </div>
</template>

<style scoped>
:deep(.v-btn) {
  text-transform: none !important;
}
.gap-2 {
  gap: 8px;
}
</style>
