import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const isDoubleXPActive = ref(false)
const isConsuming = ref(false) // 🔹 Prevent double consumption

export function useDoubleXP() {
  // 🔹 Check if user actually owns Double XP in inventory
  const hasDoubleXPInInventory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return false

      const { data } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'double_xp')
        .single()

      return data && data.quantity > 0
    } catch (error) {
      console.error('Error checking Double XP inventory:', error)
      return false
    }
  }

  // 🔹 Initialize from Supabase
  const initializeDoubleXP = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Check if active flag is set
      const { data } = await supabase
        .from('user_powerups')
        .select('double_xp_active')
        .eq('user_id', user.id)
        .single()

      if (data && data.double_xp_active) {
        // Verify they actually have it in inventory
        const hasInventory = await hasDoubleXPInInventory()
        if (hasInventory) {
          isDoubleXPActive.value = true
        } else {
          // They don't have it, deactivate
          isDoubleXPActive.value = false
          await saveToSupabase()
        }
      }
    } catch (error) {
      console.error('Error loading double XP:', error)
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
          double_xp_active: isDoubleXPActive.value,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error saving double XP:', error)
    }
  }

  const activateDoubleXP = async () => {
    // Verify they have it before activating
    const hasInventory = await hasDoubleXPInInventory()
    if (!hasInventory) {
      console.warn('Cannot activate Double XP: not in inventory')
      return false
    }

    isDoubleXPActive.value = true
    await saveToSupabase()
    return true
  }

  const consumeDoubleXP = async () => {
    // 🔹 Prevent multiple simultaneous consumption
    if (!isDoubleXPActive.value || isConsuming.value) {
      return
    }

    isConsuming.value = true

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        isConsuming.value = false
        return
      }

      // Deduct from inventory
      const { data: current } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'double_xp')
        .single()

      if (current && current.quantity > 0) {
        await supabase
          .from('user_inventory')
          .update({
            quantity: current.quantity - 1,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('item_key', 'double_xp')
      }

      // 🔹 Deactivate IMMEDIATELY (before saving to DB)
      isDoubleXPActive.value = false
      await saveToSupabase()
    } catch (error) {
      console.error('Error consuming double XP:', error)
    } finally {
      // 🔹 Always reset the consuming flag
      isConsuming.value = false
    }
  }

  return {
    isDoubleXPActive,
    activateDoubleXP,
    consumeDoubleXP,
    initializeDoubleXP,
  }
}
