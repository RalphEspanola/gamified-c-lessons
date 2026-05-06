import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

function getPHTDateString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function getYesterdayPHTString() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return getPHTDateString(yesterday)
}

export function useDailyStreak() {
  const streak = ref(0)
  const longestStreak = ref(0)
  const lastLogin = ref(null)

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
        .maybeSingle()

      if (error) throw error

      if (!data) {
        await supabase
          .from('user_streaks')
          .insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
            last_active_date: null,
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
    } catch (err) {
      console.error('Error loading streak:', err)
    }
  }

  const saveToSupabase = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('user_streaks')
        .update({
          current_streak: streak.value,
          longest_streak: longestStreak.value,
          last_active_date: lastLogin.value,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)

      if (error) throw error
    } catch (err) {
      console.error('Error saving streak:', err)
      throw err
    }
  }

  // streakSaverConsumer: async function | null
  // Called only when streak is broken. Returns true if saver was consumed, false if not.
  const handleDailyLogin = async (streakSaverConsumer = null) => {
    const todayPHT = getPHTDateString()

    if (lastLogin.value === todayPHT) {
      return { alreadyLoggedIn: true }
    }

    if (!lastLogin.value) {
      // First ever login
      streak.value = 1
    } else {
      const yesterdayPHT = getYesterdayPHTString()

      if (lastLogin.value === yesterdayPHT) {
        // Consecutive day — streak continues, no saver needed
        streak.value++
      } else {
        // Streak broken — try to consume saver if one was passed
        if (streakSaverConsumer) {
          console.log('🛡️ Attempting to use Streak Saver...')
          const consumed = await streakSaverConsumer()

          if (consumed) {
            console.log('✅ Streak Saver consumed — streak preserved!')
            // streak.value intentionally NOT reset
          } else {
            console.warn('⚠️ Streak Saver failed to consume — resetting streak')
            streak.value = 1
          }
        } else {
          streak.value = 1
        }
      }
    }

    if (streak.value > longestStreak.value) {
      longestStreak.value = streak.value
    }

    lastLogin.value = todayPHT

    try {
      await saveToSupabase()
      return { success: true }
    } catch {
      return { success: false, error: 'Failed to save streak. Try again.' }
    }
  }

  return {
    streak,
    longestStreak,
    lastLogin,
    handleDailyLogin,
    initializeStreak,
  }
}
