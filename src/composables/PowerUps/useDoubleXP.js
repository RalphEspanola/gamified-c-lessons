import { ref } from 'vue'

const isDoubleXPActive = ref(false)

export function useDoubleXP() {
  const activateDoubleXP = () => {
    isDoubleXPActive.value = true
  }

  const consumeDoubleXP = () => {
    isDoubleXPActive.value = false
  }

  return {
    isDoubleXPActive,
    activateDoubleXP,
    consumeDoubleXP,
  }
}
