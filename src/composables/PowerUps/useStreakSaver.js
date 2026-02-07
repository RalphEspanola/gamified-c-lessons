// composables/PowerUps/useStreakSaver.js
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const streakProtectionActive = ref(false)
const protectionExpiresAt = ref(null)

export function useStreakSaver() {
  // 🔹 Check if user actually owns Streak Saver in inventory
  const hasStreakSaverInInventory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return false

      const { data } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'streak_saver')
        .single()

      return data && data.quantity > 0
    } catch (error) {
      console.error('Error checking Streak Saver inventory:', error)
      return false
    }
  }

  // 🔹 Initialize from Supabase
  const initializeStreakSaver = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('user_powerups')
        .select('streak_saver_active, streak_saver_expires_at')
        .eq('user_id', user.id)
        .single()

      if (data && data.streak_saver_active) {
        // Verify they actually have it in inventory
        const hasInventory = await hasStreakSaverInInventory()

        if (hasInventory) {
          streakProtectionActive.value = true
          protectionExpiresAt.value = data.streak_saver_expires_at
            ? new Date(data.streak_saver_expires_at).getTime()
            : null

          // Check if expired
          if (protectionExpiresAt.value && Date.now() > protectionExpiresAt.value) {
            await deactivateProtection()
          }
        } else {
          // They don't have it, deactivate
          await deactivateProtection()
        }
      }
    } catch (error) {
      console.error('Error loading streak saver:', error)
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
          streak_saver_active: streakProtectionActive.value,
          streak_saver_expires_at: protectionExpiresAt.value
            ? new Date(protectionExpiresAt.value).toISOString()
            : null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error saving streak saver:', error)
    }
  }

  const activateStreakSaver = async () => {
    // Verify they have it before activating
    const hasInventory = await hasStreakSaverInInventory()
    if (!hasInventory) {
      console.warn('Cannot activate Streak Saver: not in inventory')
      return false
    }

    streakProtectionActive.value = true
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(23, 59, 59, 999)
    protectionExpiresAt.value = tomorrow.getTime()
    await saveToSupabase()
    return true
  }

  const deactivateProtection = async () => {
    streakProtectionActive.value = false
    protectionExpiresAt.value = null
    await saveToSupabase()
  }

  const isStreakProtected = computed(() => {
    if (!streakProtectionActive.value || !protectionExpiresAt.value) {
      return false
    }

    if (Date.now() > protectionExpiresAt.value) {
      deactivateProtection()
      return false
    }

    return true
  })

  const useStreakProtection = async () => {
    if (!isStreakProtected.value) return false

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return false

      // Deduct from inventory
      const { data: current } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'streak_saver')
        .single()

      if (current && current.quantity > 0) {
        await supabase
          .from('user_inventory')
          .update({
            quantity: current.quantity - 1,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('item_key', 'streak_saver')
      }

      // Deactivate protection
      await deactivateProtection()
      return true
    } catch (error) {
      console.error('Error using streak protection:', error)
      return false
    }
  }

  const timeRemaining = computed(() => {
    if (!protectionExpiresAt.value) return 0
    return Math.max(0, protectionExpiresAt.value - Date.now())
  })

  const formattedTimeRemaining = computed(() => {
    const hours = Math.floor(timeRemaining.value / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  })

  return {
    isStreakProtected,
    activateStreakSaver,
    useStreakProtection,
    timeRemaining,
    formattedTimeRemaining,
    initializeStreakSaver,
  }
}
