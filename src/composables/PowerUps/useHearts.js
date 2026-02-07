// src/composables/useHearts.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/utils/supabase'

const MAX_HEARTS = 5
const REFILL_TIME = 30 * 60 * 1000 // 30 minutes in ms

// Global reactive state
const hearts = ref(MAX_HEARTS)
const lastLostTime = ref(Date.now())
let refillInterval = null
const loading = ref(true)

export function useHearts() {
  // ---------- HELPERS ----------
  const getUserId = async () => {
    const { data } = await supabase.auth.getUser()
    return data.user?.id
  }

  const loadData = async () => {
    const userId = await getUserId()
    if (!userId) return

    loading.value = true
    try {
      const { data, error } = await supabase
        .from('user_wallet')
        .select('hearts, last_lost_time')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        hearts.value = data.hearts ?? MAX_HEARTS
        lastLostTime.value = data.last_lost_time ?? Date.now()
      } else {
        // First-time user, insert row
        await supabase.from('user_wallet').insert({
          user_id: userId,
          hearts: MAX_HEARTS,
          last_lost_time: Date.now(),
        })
      }
    } catch (err) {
      console.warn('Failed to load hearts from Supabase', err.message)
    } finally {
      loading.value = false
    }
  }

  const saveData = async () => {
    const userId = await getUserId()
    if (!userId) return

    try {
      await supabase
        .from('user_wallet')
        .update({
          hearts: hearts.value,
          last_lost_time: lastLostTime.value,
        })
        .eq('user_id', userId)
    } catch (err) {
      console.warn('Failed to save hearts to Supabase', err.message)
    }
  }

  // ---------- REFILL LOGIC ----------
  const refillHearts = async () => {
    if (hearts.value >= MAX_HEARTS) return

    const now = Date.now()
    const timePassed = now - lastLostTime.value
    const heartsToRefill = Math.floor(timePassed / REFILL_TIME)

    if (heartsToRefill > 0) {
      hearts.value = Math.min(MAX_HEARTS, hearts.value + heartsToRefill)
      lastLostTime.value = now - (timePassed % REFILL_TIME)
      await saveData()
    }
  }

  const startRefillInterval = () => {
    if (!refillInterval) {
      refillInterval = setInterval(refillHearts, 1000)
    }
  }

  const stopRefillInterval = () => {
    if (refillInterval) {
      clearInterval(refillInterval)
      refillInterval = null
    }
  }

  // ---------- HEART ACTIONS ----------
  const loseHeart = async () => {
    if (hearts.value > 0) {
      hearts.value--
      lastLostTime.value = Date.now()
      await saveData()
      return true
    }
    return false
  }

  const gainHeart = async () => {
    if (hearts.value < MAX_HEARTS) {
      hearts.value++
      await saveData()
      return true
    }
    return false
  }

  const restoreAllHearts = async () => {
    hearts.value = MAX_HEARTS
    lastLostTime.value = Date.now()
    await saveData()
  }

  // ---------- COMPUTED ----------
  const canContinue = computed(() => hearts.value > 0)

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

  const heartPercentage = computed(() => (hearts.value / MAX_HEARTS) * 100)

  // ---------- LIFECYCLE ----------
  onMounted(() => {
    loadData().then(() => {
      startRefillInterval()
      refillHearts()
    })
  })

  onUnmounted(() => {
    stopRefillInterval()
  })

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
    heartPercentage,
    loading,
  }
}
