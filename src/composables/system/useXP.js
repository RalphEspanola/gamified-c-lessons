// composables/system/useXP.js
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const xp = ref(0)
const level = ref(1)
const isInitialized = ref(false)

export function useXP() {
  // ✅ FIXED: Progressive XP calculation
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

  const xpForCurrentLevel = computed(() => {
    return calculateXPForLevel(level.value)
  })

  const xpForNextLevel = computed(() => {
    return calculateXPForLevel(level.value + 1)
  })

  const xpNeededForNextLevel = computed(() => {
    return calculateXPForNextLevel(level.value)
  })

  const xpProgressInLevel = computed(() => {
    const xpInCurrentLevel = xp.value - xpForCurrentLevel.value
    return Math.max(0, xpInCurrentLevel)
  })

  const xpProgressPercentage = computed(() => {
    const progress = (xpProgressInLevel.value / xpNeededForNextLevel.value) * 100
    return Math.min(Math.max(progress, 0), 100)
  })

  const xpRemainingToNextLevel = computed(() => {
    return Math.max(0, xpNeededForNextLevel.value - xpProgressInLevel.value)
  })

  // 🔹 Initialize from Supabase
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

      // 🔹 Get user stats with BOTH xp AND level
      const { data: stats, error } = await supabase
        .from('user_stats')
        .select('xp, level')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('❌ Error fetching stats:', error)

        // 🔹 If no stats exist, create initial record
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

  // 🔹 Add XP and handle level ups
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

      // Check for level up
      let levelsGained = 0
      while (xp.value >= xpForNextLevel.value) {
        level.value++
        levelsGained++
        console.log(`🎉 LEVEL UP! Now level ${level.value}`)
        console.log(`📊 XP needed for next level: ${xpNeededForNextLevel.value}`)
      }

      // 🔹 Save BOTH xp AND level to database
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

  return {
    // State
    xp,
    level,
    isInitialized,

    // Computed
    xpForCurrentLevel,
    xpForNextLevel,
    xpNeededForNextLevel,
    xpProgressInLevel,
    xpProgressPercentage,
    xpRemainingToNextLevel,

    // Methods
    initializeXP,
    addXP,

    // Helper
    XP_PER_LEVEL: computed(() => xpNeededForNextLevel.value),
  }
}
