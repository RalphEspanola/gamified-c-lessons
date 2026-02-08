// composables/useLeaderboard.js
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

const leaderboard = ref([])
const currentUserRank = ref(null)
const isLoading = ref(false)

export function useLeaderboard() {
  // 🔹 Fetch leaderboard data
  const fetchLeaderboard = async (limit = 100) => {
    try {
      isLoading.value = true

      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('rank', { ascending: true }) // Order by rank, not XP
        .limit(limit)

      if (error) {
        console.error('Leaderboard error:', error)
        throw error
      }

      leaderboard.value = data || []

      // Find current user's rank
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        currentUserRank.value = leaderboard.value.find((u) => u.user_id === user.id)
      }

      console.log('✅ Leaderboard loaded:', leaderboard.value.length, 'users')
      return data
    } catch (error) {
      console.error('❌ Error fetching leaderboard:', error)
      return []
    } finally {
      isLoading.value = false
    }
  }

  // 🔹 Get top N users
  const getTopUsers = (n = 10) => {
    return leaderboard.value.slice(0, n)
  }

  // 🔹 Get users around current user
  const getUsersAroundMe = (range = 5) => {
    if (!currentUserRank.value) return []

    const currentIndex = leaderboard.value.findIndex(
      (u) => u.user_id === currentUserRank.value.user_id,
    )

    if (currentIndex === -1) return []

    const start = Math.max(0, currentIndex - range)
    const end = Math.min(leaderboard.value.length, currentIndex + range + 1)

    return leaderboard.value.slice(start, end)
  }

  // 🔹 Refresh leaderboard
  const refreshLeaderboard = async () => {
    return await fetchLeaderboard()
  }

  return {
    leaderboard,
    currentUserRank,
    isLoading,
    fetchLeaderboard,
    getTopUsers,
    getUsersAroundMe,
    refreshLeaderboard,
  }
}
