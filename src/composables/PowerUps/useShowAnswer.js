// composables/useShowAnswer.js
import { ref } from 'vue'

export function useShowAnswer(coinsRef) {
  const SHOW_ANSWER_COST = 20

  // stores the last revealed answer (optional)
  const revealedAnswer = ref(null)

  function showAnswer(correctAnswer) {
    if (coinsRef.value < SHOW_ANSWER_COST) {
      return { success: false, message: 'Not enough coins' }
    }

    // Deduct coins
    coinsRef.value -= SHOW_ANSWER_COST
    window.localStorage.setItem('coins', coinsRef.value.toString())

    // Return the real answer
    revealedAnswer.value = correctAnswer

    return {
      success: true,
      answer: correctAnswer,
      cost: SHOW_ANSWER_COST,
    }
  }

  return {
    SHOW_ANSWER_COST,
    revealedAnswer,
    showAnswer,
  }
}
