<script setup>
import { ref, onMounted } from 'vue'
import { useShop } from '@/composables/system/useShop'
import { useAnswerProtection } from '@/composables/PowerUps/useAnswerProtection'
import AnswerFeedback from './System/AnswerFeedback.vue'

const props = defineProps({
  quiz: { type: Object, required: true },
})
const emit = defineEmits(['wrong-answer', 'correct-answer', 'use-show-answer'])

const selected = ref('')
const feedback = ref('')
const protectionTriggered = ref(false)

// Feedback overlay
const showFeedback = ref(false)
const answeredCorrect = ref(false)

const { spendCoins, canAfford, initializeShop } = useShop()
const { isProtectionActive, useProtection, initializeProtection } = useAnswerProtection()

const SHOW_ANSWER_COST = 3

onMounted(async () => {
  await Promise.all([initializeShop(), initializeProtection()])
})

async function checkAnswer(option) {
  if (selected.value) return
  selected.value = option
  protectionTriggered.value = false

  if (option === props.quiz.answer) {
    feedback.value = '✅ Correct! Great job!'
    answeredCorrect.value = true
    showFeedback.value = true
    emit('correct-answer')
  } else {
    if (isProtectionActive.value) {
      const wasProtected = await useProtection()
      if (wasProtected) {
        protectionTriggered.value = true
        feedback.value = '🛡️ Answer Protection saved you! No heart lost.'
        answeredCorrect.value = false
        showFeedback.value = true
        return
      }
    }

    feedback.value = '❌ Not quite. Try again!'
    answeredCorrect.value = false
    showFeedback.value = true
    emit('wrong-answer')
  }
}

async function revealAnswer() {
  if (!canAfford(SHOW_ANSWER_COST)) {
    feedback.value = '⚠️ Not enough coins to reveal the answer.'
    return
  }

  const success = await spendCoins(SHOW_ANSWER_COST)
  if (!success) {
    feedback.value = '⚠️ Failed to spend coins.'
    return
  }

  selected.value = props.quiz.answer
  feedback.value = `💰 Revealed! The correct answer is "${props.quiz.answer}"`
  emit('use-show-answer', { cost: SHOW_ANSWER_COST })
}

function onFeedbackDone() {
  showFeedback.value = false
}
</script>

<template>
  <div style="position: relative">
    <!-- Feedback overlay -->
    <AnswerFeedback
      :show="showFeedback"
      :correct="answeredCorrect"
      :xp-gained="10"
      @done="onFeedbackDone"
    />

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

    <!-- Show Answer Button -->
    <v-btn
      color="deep-purple-accent-3"
      size="small"
      variant="tonal"
      class="mt-4"
      @click="revealAnswer"
      :disabled="selected === quiz.answer"
    >
      Show Answer ({{ SHOW_ANSWER_COST }} coins)
    </v-btn>

    <!-- Feedback alert -->
    <v-alert
      v-if="feedback"
      :type="
        feedback.includes('✅')
          ? 'success'
          : feedback.includes('🛡️') || feedback.includes('💰')
            ? 'info'
            : 'error'
      "
      class="mt-3"
      variant="tonal"
    >
      {{ feedback }}
    </v-alert>
  </div>
</template>
