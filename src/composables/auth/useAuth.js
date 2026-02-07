// composables/useAuth.js
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

const currentUser = ref(null)

export function useAuth() {
  const loadUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    currentUser.value = user
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser.value = session?.user || null
  })

  loadUser()

  return {
    currentUser,
  }
}
