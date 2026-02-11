// composables/useDailyStreak.js
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

const streak = ref(0)
const longestStreak = ref(0)
const lastLogin = ref(null)

export function useDailyStreak() {
  // 🔹 Initialize from Supabase
  const initializeStreak = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle() // ✅ safer

      // If no row exists → create one
      if (!data) {
        const { data: newRow } = await supabase
          .from('user_streaks')
          .insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
          })
          .select()
          .single()

        streak.value = 0
        longestStreak.value = 0
        lastLogin.value = null
        return
      }

      streak.value = data.current_streak
      longestStreak.value = data.longest_streak
      lastLogin.value = data.last_active_date
    } catch (error) {
      console.error('Error loading streak:', error)
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
        .from('user_streaks')
        .update({
          current_streak: streak.value,
          longest_streak: longestStreak.value,
          last_active_date: lastLogin.value,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error saving streak:', error)
    }
  }

  const handleDailyLogin = async (hasStreakSaver = false) => {
    const today = new Date().toISOString().slice(0, 10)

    if (lastLogin.value === today) {
      return // Already logged in today
    }

    if (!lastLogin.value) {
      // First login
      streak.value = 1
    } else {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().slice(0, 10)

      if (lastLogin.value === yesterdayStr) {
        // Continue streak
        streak.value++
      } else {
        // Streak broken
        if (hasStreakSaver) {
          console.log('🛡️ Streak Saver used!')
        } else {
          streak.value = 1
        }
      }
    }

    // Update longest streak
    if (streak.value > longestStreak.value) {
      longestStreak.value = streak.value
    }

    lastLogin.value = today
    await saveToSupabase()
  }

  return {
    streak,
    longestStreak,
    lastLogin,
    handleDailyLogin,
    initializeStreak,
  }
}
