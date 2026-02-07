// composables/PowerUps/useAnswerProtection.js
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const answerProtectionActive = ref(false)

export function useAnswerProtection() {
  // 🔹 Check if user actually owns Answer Protection in inventory
  const hasAnswerProtectionInInventory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return false

      const { data } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'answer_protect')
        .single()

      return data && data.quantity > 0
    } catch (error) {
      console.error('Error checking Answer Protection inventory:', error)
      return false
    }
  }

  // 🔹 Initialize from Supabase
  const initializeProtection = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('user_powerups')
        .select('answer_protection_active')
        .eq('user_id', user.id)
        .single()

      if (data) {
        answerProtectionActive.value = data.answer_protection_active || false
      }
    } catch (error) {
      console.error('Error loading answer protection:', error)
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
          answer_protection_active: answerProtectionActive.value,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error saving answer protection:', error)
    }
  }

  // ✅ ACTIVATE: Just mark as ready, DON'T deduct inventory
  const activateAnswerProtection = async () => {
    // Verify they have it before activating
    const hasInventory = await hasAnswerProtectionInInventory()
    if (!hasInventory) {
      console.warn('Cannot activate Answer Protection: not in inventory')
      return false
    }

    // Just activate - don't deduct yet
    answerProtectionActive.value = true
    await saveToSupabase()
    return true
  }

  const isProtectionActive = computed(() => {
    return answerProtectionActive.value
  })

  // ✅ USE: Deduct from inventory NOW (when actually protecting from wrong answer)
  const useProtection = async () => {
    if (!isProtectionActive.value) return false

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return false

      // Deduct from inventory NOW
      const { data: current } = await supabase
        .from('user_inventory')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('item_key', 'answer_protect')
        .single()

      if (current && current.quantity > 0) {
        await supabase
          .from('user_inventory')
          .update({
            quantity: current.quantity - 1,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('item_key', 'answer_protect')
      } else {
        // They don't have any left - shouldn't happen but handle it
        console.warn('No Answer Protection in inventory to consume')
        answerProtectionActive.value = false
        await saveToSupabase()
        return false
      }

      // Deactivate after use
      answerProtectionActive.value = false
      await saveToSupabase()
      return true
    } catch (error) {
      console.error('Error using protection:', error)
      return false
    }
  }

  // ✅ DEACTIVATE: Turn off without consuming
  const deactivateProtection = async () => {
    answerProtectionActive.value = false
    await saveToSupabase()
  }

  return {
    isProtectionActive,
    activateAnswerProtection,
    useProtection,
    deactivateProtection,
    initializeProtection,
  }
}
