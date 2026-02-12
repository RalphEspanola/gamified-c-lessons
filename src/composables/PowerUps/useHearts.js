// src/composables/useHearts.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/utils/supabase'

const MAX_HEARTS = 5
const REFILL_TIME = 30 * 60 * 1000 // 30 minutes in ms

// Global reactive state
const hearts = ref(MAX_HEARTS)
const lastLostTime = ref(null) // ✅ Changed to null initially
let refillInterval = null
const loading = ref(true)
const initialized = ref(false) // ✅ Track if we've initialized

export function useHearts() {
  // ---------- HELPERS ----------
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
        .select('hearts, last_lost_time')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        hearts.value = data.hearts ?? MAX_HEARTS

        // ✅ Parse the timestamp correctly
        const savedTime = data.last_lost_time
        if (savedTime) {
          // If it's a string (ISO format), parse it
          lastLostTime.value =
            typeof savedTime === 'string' ? new Date(savedTime).getTime() : savedTime
        } else {
          lastLostTime.value = Date.now()
        }

        console.log('💾 Loaded hearts:', hearts.value)
        console.log('⏰ Last lost time:', new Date(lastLostTime.value).toLocaleString())
      } else {
        // First-time user, insert row
        const now = Date.now()
        hearts.value = MAX_HEARTS
        lastLostTime.value = now

        await supabase.from('user_stats').insert({
          user_id: userId,
          hearts: MAX_HEARTS,
          last_lost_time: now,
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
        'Last lost:',
        new Date(lastLostTime.value).toLocaleString(),
      )

      await supabase
        .from('user_stats')
        .update({
          hearts: hearts.value,
          last_lost_time: lastLostTime.value,
        })
        .eq('user_id', userId)
    } catch (err) {
      console.error('❌ Failed to save hearts to Supabase:', err.message)
    }
  }

  // ---------- REFILL LOGIC ----------
  const refillHearts = async () => {
    if (hearts.value >= MAX_HEARTS) return
    if (!lastLostTime.value) return // ✅ Don't refill if we don't have a valid timestamp

    const now = Date.now()
    const timePassed = now - lastLostTime.value

    // ✅ Only refill if at least REFILL_TIME has passed
    if (timePassed < REFILL_TIME) {
      return // Not enough time has passed yet
    }

    const heartsToRefill = Math.floor(timePassed / REFILL_TIME)

    if (heartsToRefill > 0) {
      const newHearts = Math.min(MAX_HEARTS, hearts.value + heartsToRefill)

      console.log(`💗 Refilling ${heartsToRefill} heart(s). ${hearts.value} → ${newHearts}`)

      hearts.value = newHearts

      // ✅ Update lastLostTime correctly
      lastLostTime.value = now - (timePassed % REFILL_TIME)

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

  // ---------- HEART ACTIONS ----------
  const loseHeart = async () => {
    if (hearts.value > 0) {
      hearts.value--
      lastLostTime.value = Date.now()
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
      await saveData()
      return true
    }
    return false
  }

  const restoreAllHearts = async () => {
    hearts.value = MAX_HEARTS
    lastLostTime.value = Date.now()
    console.log(`✨ Restored all hearts to ${MAX_HEARTS}`)
    await saveData()
  }

  // ✅ Add initialize function for consistency
  const initializeHearts = async () => {
    if (initialized.value) {
      console.log('⏭️ Hearts already initialized')
      return
    }

    console.log('🔄 Initializing hearts...')
    await loadData()
    await refillHearts() // Check for refills after loading
    startRefillInterval()
    initialized.value = true
  }

  // ---------- COMPUTED ----------
  const canContinue = computed(() => hearts.value > 0)

  const timeUntilNextHeart = computed(() => {
    if (hearts.value >= MAX_HEARTS) return 0
    if (!lastLostTime.value) return 0

    const now = Date.now()
    const timePassed = now - lastLostTime.value
    const remaining = REFILL_TIME - (timePassed % REFILL_TIME)

    return remaining
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
    initializeHearts()
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
    initializeHearts, // ✅ Export this
  }
}
