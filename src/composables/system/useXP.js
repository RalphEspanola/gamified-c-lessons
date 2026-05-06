import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

// Module-level — shared across all components (intentional)
const xp = ref(0)
const level = ref(1)
const isInitialized = ref(false)

export function useXP() {
  const calculateXPForLevel = (targetLevel) => {
    const baseXP = 100
    let totalXP = 0
    for (let lvl = 1; lvl < targetLevel; lvl++) {
      totalXP += Math.floor(baseXP * Math.pow(1.5, lvl - 1))
    }
    return totalXP
  }

  const calculateXPForNextLevel = (currentLevel) => {
    const baseXP = 100
    return Math.floor(baseXP * Math.pow(1.5, currentLevel - 1))
  }

  const xpForCurrentLevel = computed(() => calculateXPForLevel(level.value))
  const xpForNextLevel = computed(() => calculateXPForLevel(level.value + 1))
  const xpNeededForNextLevel = computed(() => calculateXPForNextLevel(level.value))

  const xpProgressInLevel = computed(() => {
    return Math.max(0, xp.value - xpForCurrentLevel.value)
  })

  const xpProgressPercentage = computed(() => {
    const progress = (xpProgressInLevel.value / xpNeededForNextLevel.value) * 100
    return Math.min(Math.max(progress, 0), 100)
  })

  const xpRemainingToNextLevel = computed(() => {
    return Math.max(0, xpNeededForNextLevel.value - xpProgressInLevel.value)
  })

  const initializeXP = async () => {
    if (isInitialized.value) {
      console.log('⚠️ XP already initialized, skipping...')
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.log('⚠️ No user found')
        return
      }

      const { data: stats, error } = await supabase
        .from('user_stats')
        .select('xp, level')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('❌ Error fetching stats:', error)

        if (error.code === 'PGRST116') {
          console.log('📝 Creating initial user stats...')
          const { error: insertError } = await supabase.from('user_stats').insert({
            user_id: user.id,
            xp: 0,
            level: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (insertError) {
            console.error('❌ Error creating stats:', insertError)
          } else {
            xp.value = 0
            level.value = 1
            isInitialized.value = true
          }
        }
        return
      }

      if (stats) {
        xp.value = stats.xp || 0
        level.value = stats.level || 1
        isInitialized.value = true

        console.log('✅ XP initialized:', {
          xp: xp.value,
          level: level.value,
          xpForCurrentLevel: xpForCurrentLevel.value,
          xpForNextLevel: xpForNextLevel.value,
          xpNeeded: xpNeededForNextLevel.value,
          progress: xpProgressInLevel.value,
        })
      }
    } catch (error) {
      console.error('❌ Error loading XP:', error)
    }
  }

  const addXP = async (amount) => {
    if (!isInitialized.value) {
      console.warn('⚠️ XP not initialized yet, initializing now...')
      await initializeXP()
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.error('❌ No user found')
        return 0
      }

      xp.value += amount
      console.log(`✨ Added ${amount} XP. Total: ${xp.value}`)

      let levelsGained = 0
      while (xp.value >= xpForNextLevel.value) {
        level.value++
        levelsGained++
        console.log(`🎉 LEVEL UP! Now level ${level.value}`)
      }

      const { error } = await supabase
        .from('user_stats')
        .update({
          xp: xp.value,
          level: level.value,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Error saving XP:', error)
        return 0
      }

      if (levelsGained > 0) {
        console.log(`🌟 Gained ${levelsGained} level(s)!`)
      }

      return levelsGained
    } catch (error) {
      console.error('❌ Error adding XP:', error)
      return 0
    }
  }

  // ✅ Called on logout to clear state before next user loads
  const reset = () => {
    xp.value = 0
    level.value = 1
    isInitialized.value = false
    console.log('🔄 XP state reset')
  }

  return {
    xp,
    level,
    isInitialized,
    xpForCurrentLevel,
    xpForNextLevel,
    xpNeededForNextLevel,
    xpProgressInLevel,
    xpProgressPercentage,
    xpRemainingToNextLevel,
    initializeXP,
    addXP,
    reset,
    XP_PER_LEVEL: computed(() => xpNeededForNextLevel.value),
  }
}
