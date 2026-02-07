// composables/PowerUps/useHearts.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/utils/supabase'

const MAX_HEARTS = 5
const REFILL_TIME = 30 * 60 * 1000 // 30 minutes

const hearts = ref(MAX_HEARTS)
const lastLostTime = ref(Date.now())
let refillInterval = null

export function useHearts() {
  // 🔹 Initialize hearts from Supabase
  const initializeHearts = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('user_powerups')
        .select('hearts, last_heart_refill')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (data) {
        hearts.value = data.hearts
        lastLostTime.value = new Date(data.last_heart_refill).getTime()
      }

      startRefillInterval()
      refillHearts()
    } catch (error) {
      console.error('Error loading hearts:', error)
    }
  }

  onMounted(() => {
    initializeHearts()
  })

  onUnmounted(() => {
    stopRefillInterval()
  })

  const startRefillInterval = () => {
    if (!refillInterval) {
      refillInterval = setInterval(() => {
        refillHearts()
      }, 1000)
    }
  }

  const stopRefillInterval = () => {
    if (refillInterval) {
      clearInterval(refillInterval)
      refillInterval = null
    }
  }

  // 🔹 Save to Supabase
  const saveToSupabase = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('user_powerups')
        .update({
          hearts: hearts.value,
          last_heart_refill: new Date(lastLostTime.value).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error saving hearts:', error)
    }
  }

  // 🔹 Refill hearts based on time
  const refillHearts = async () => {
    if (hearts.value >= MAX_HEARTS) return

    const now = Date.now()
    const timePassed = now - lastLostTime.value
    const heartsToRefill = Math.floor(timePassed / REFILL_TIME)

    if (heartsToRefill > 0) {
      hearts.value = Math.min(MAX_HEARTS, hearts.value + heartsToRefill)
      lastLostTime.value = now - (timePassed % REFILL_TIME)
      await saveToSupabase()
    }
  }

  // 🔹 Lose a heart
  const loseHeart = async () => {
    if (hearts.value > 0) {
      hearts.value--
      lastLostTime.value = Date.now()
      await saveToSupabase()
      return true
    }
    return false
  }

  // 🔹 Gain a heart
  const gainHeart = async () => {
    if (hearts.value < MAX_HEARTS) {
      hearts.value++
      await saveToSupabase()
      return true
    }
    return false
  }

  // 🔹 Restore all hearts
  const restoreAllHearts = async () => {
    hearts.value = MAX_HEARTS
    lastLostTime.value = Date.now()
    await saveToSupabase()
  }

  const timeUntilNextHeart = computed(() => {
    if (hearts.value >= MAX_HEARTS) return 0
    const now = Date.now()
    const timePassed = now - lastLostTime.value
    return REFILL_TIME - (timePassed % REFILL_TIME)
  })

  const formattedTimeRemaining = computed(() => {
    const ms = timeUntilNextHeart.value
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  const canContinue = computed(() => hearts.value > 0)

  return {
    hearts,
    MAX_HEARTS,
    loseHeart,
    gainHeart,
    refillHearts,
    restoreAllHearts,
    canContinue,
    timeUntilNextHeart,
    formattedTimeRemaining,
    initializeHearts,
  }
}
