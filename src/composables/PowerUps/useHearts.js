import { ref, computed, onUnmounted } from 'vue'
import { supabase } from '@/utils/supabase'

const MAX_HEARTS = 5
const REFILL_TIME = 30 * 60 * 1000

// Module-level — shared across all components (intentional)
const hearts = ref(MAX_HEARTS)
const nextRefillTime = ref(null)
const loading = ref(true)
const initialized = ref(false)
let refillInterval = null

export function useHearts() {
  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user?.id
  }

  const loadData = async () => {
    const userId = await getUserId()
    if (!userId) return

    loading.value = true
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('hearts, next_refill_time')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        hearts.value = data.hearts ?? MAX_HEARTS

        const savedTime = data.next_refill_time
        if (savedTime && hearts.value < MAX_HEARTS) {
          nextRefillTime.value =
            typeof savedTime === 'string' ? new Date(savedTime).getTime() : savedTime
        } else {
          nextRefillTime.value = null
        }

        console.log('💾 Loaded hearts:', hearts.value)
        console.log(
          '⏰ Next refill time:',
          nextRefillTime.value ? new Date(nextRefillTime.value).toLocaleString() : 'N/A',
        )
      } else {
        hearts.value = MAX_HEARTS
        nextRefillTime.value = null

        await supabase.from('user_stats').insert({
          user_id: userId,
          hearts: MAX_HEARTS,
          next_refill_time: null,
        })

        console.log('✨ Created new user stats')
      }
    } catch (err) {
      console.error('❌ Failed to load hearts from Supabase:', err.message)
    } finally {
      loading.value = false
    }
  }

  const saveData = async () => {
    const userId = await getUserId()
    if (!userId) return

    try {
      console.log(
        '💾 Saving hearts:',
        hearts.value,
        'Next refill:',
        nextRefillTime.value ? new Date(nextRefillTime.value).toLocaleString() : 'N/A',
      )

      await supabase
        .from('user_stats')
        .update({
          hearts: hearts.value,
          next_refill_time: nextRefillTime.value,
        })
        .eq('user_id', userId)
    } catch (err) {
      console.error('❌ Failed to save hearts to Supabase:', err.message)
    }
  }

  const refillHearts = async () => {
    if (hearts.value >= MAX_HEARTS) {
      nextRefillTime.value = null
      return
    }

    if (!nextRefillTime.value) {
      nextRefillTime.value = Date.now() + REFILL_TIME
      await saveData()
      return
    }

    const now = Date.now()

    if (now >= nextRefillTime.value) {
      hearts.value++
      console.log(`💗 Refilled 1 heart. Hearts: ${hearts.value}`)

      if (hearts.value < MAX_HEARTS) {
        nextRefillTime.value = now + REFILL_TIME
      } else {
        nextRefillTime.value = null
      }

      await saveData()
    }
  }

  const startRefillInterval = () => {
    if (!refillInterval) {
      console.log('▶️ Starting refill interval')
      refillInterval = setInterval(refillHearts, 1000)
    }
  }

  const stopRefillInterval = () => {
    if (refillInterval) {
      console.log('⏸️ Stopping refill interval')
      clearInterval(refillInterval)
      refillInterval = null
    }
  }

  const loseHeart = async () => {
    if (hearts.value > 0) {
      hearts.value--

      if (hearts.value === MAX_HEARTS - 1 && !nextRefillTime.value) {
        nextRefillTime.value = Date.now() + REFILL_TIME
      }

      console.log(`💔 Lost a heart. Hearts: ${hearts.value}`)
      await saveData()
      return true
    }
    return false
  }

  const gainHeart = async () => {
    if (hearts.value < MAX_HEARTS) {
      hearts.value++
      console.log(`💚 Gained a heart. Hearts: ${hearts.value}`)

      if (hearts.value >= MAX_HEARTS) {
        nextRefillTime.value = null
      }

      await saveData()
      return true
    }
    return false
  }

  const restoreAllHearts = async () => {
    hearts.value = MAX_HEARTS
    nextRefillTime.value = null
    console.log(`✨ Restored all hearts to ${MAX_HEARTS}`)
    await saveData()
  }

  const initializeHearts = async () => {
    if (initialized.value) {
      console.log('⏭️ Hearts already initialized')
      return
    }

    console.log('🔄 Initializing hearts...')
    await loadData()
    await refillHearts()
    startRefillInterval()
    initialized.value = true
  }

  // ✅ Called on logout to clear state before next user loads
  const reset = () => {
    stopRefillInterval()
    hearts.value = MAX_HEARTS
    nextRefillTime.value = null
    loading.value = true
    initialized.value = false
    console.log('🔄 Hearts state reset')
  }

  const canContinue = computed(() => hearts.value > 0)

  const timeUntilNextHeart = computed(() => {
    if (hearts.value >= MAX_HEARTS || !nextRefillTime.value) return 0
    return Math.max(0, nextRefillTime.value - Date.now())
  })

  const formattedTimeRemaining = computed(() => {
    const ms = timeUntilNextHeart.value
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  const heartPercentage = computed(() => (hearts.value / MAX_HEARTS) * 100)

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
    initializeHearts,
    reset,
  }
}
