<script setup>
import { ref, onMounted } from 'vue'
import { useShop } from '@/composables/system/useShop'
import { useAnswerProtection } from '@/composables/PowerUps/useAnswerProtection'

const props = defineProps({
  quiz: { type: Object, required: true },
})
const emit = defineEmits(['wrong-answer', 'correct-answer', 'use-show-answer'])

const selected = ref('')
const feedback = ref('')
const protectionTriggered = ref(false)

const { coins, spendCoins, canAfford, initializeShop } = useShop()
const { isProtectionActive, useProtection, initializeProtection } = useAnswerProtection()

// 🔹 Initialize on mount
onMounted(async () => {
  await Promise.all([initializeShop(), initializeProtection()])
})

// Cost for showing the answer
const SHOW_ANSWER_COST = 3

async function checkAnswer(option) {
  selected.value = option
  protectionTriggered.value = false

  if (option === props.quiz.answer) {
    feedback.value = '✅ Correct! Great job!'
    emit('correct-answer')
  } else {
    if (isProtectionActive.value) {
      const wasProtected = await useProtection()
      if (wasProtected) {
        protectionTriggered.value = true
        feedback.value = '🛡️ Answer Protection saved you! No heart lost.'
        return
      }
    }

    feedback.value = '❌ Not quite. Try again!'
    emit('wrong-answer')
  }
}

// ✅ FIXED: Reveal the correct answer by spending coins
async function revealAnswer() {
  if (!canAfford(SHOW_ANSWER_COST)) {
    feedback.value = '⚠️ Not enough coins to reveal the answer.'
    return
  }

  // ✅ Actually spend the coins
  const success = await spendCoins(SHOW_ANSWER_COST)

  if (!success) {
    feedback.value = '⚠️ Failed to spend coins.'
    return
  }

  selected.value = props.quiz.answer
  feedback.value = `💰 Revealed! The correct answer is "${props.quiz.answer}"`
  emit('use-show-answer', { cost: SHOW_ANSWER_COST })
}
</script>

<template>
  <div>
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

    <!-- Feedback -->
    <v-alert
      v-if="feedback"
      :type="
        feedback.includes('✅')
          ? 'success'
          : feedback.includes('🛡️')
            ? 'info'
            : feedback.includes('💰')
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
