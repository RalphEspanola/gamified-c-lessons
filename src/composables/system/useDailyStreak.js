// /src/composables/useDailyStreak.js
import { ref } from 'vue'

const streak = ref(0)
const lastLogin = ref(null) // stores date string (YYYY-MM-DD)
const hasStreakSaver = ref(false) // power-up

export function useDailyStreak() {
  function loadData() {
    const data = JSON.parse(localStorage.getItem('dailyStreak'))
    if (data) {
      streak.value = data.streak || 0
      lastLogin.value = data.lastLogin || null
      hasStreakSaver.value = data.hasStreakSaver || false
    }
  }

  function saveData() {
    localStorage.setItem(
      'dailyStreak',
      JSON.stringify({
        streak: streak.value,
        lastLogin: lastLogin.value,
        hasStreakSaver: hasStreakSaver.value,
      }),
    )
  }

  loadData()

  // Get today's date (YYYY-MM-DD)
  const today = new Date().toISOString().slice(0, 10)

  // Function to check daily login streak
  function handleDailyLogin() {
    if (lastLogin.value === today) {
      // Already logged in today — do nothing
      return
    }

    if (!lastLogin.value) {
      // First time ever
      streak.value = 1
    } else {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().slice(0, 10)

      if (lastLogin.value === yesterdayStr) {
        // Logged in yesterday → continue streak
        streak.value++
      } else {
        // Missed a day → streak breaks
        if (hasStreakSaver.value) {
          console.log('🛡️ Streak Saver used! Streak preserved.')
          hasStreakSaver.value = false // consume
        } else {
          streak.value = 1 // reset streak
        }
      }
    }

    lastLogin.value = today
    saveData()
  }

  // Power-up purchase
  function buyStreakSaver() {
    hasStreakSaver.value = true
    saveData()
  }

  return {
    streak,
    lastLogin,
    hasStreakSaver,
    handleDailyLogin,
    buyStreakSaver,
  }
}
