import { ref, reactive } from 'vue'
import { supabase } from '@/utils/supabase'
import { formActionDefault } from '@/utils/supabase'

export function useRegister() {
  const refVForm = ref(null)

  const formData = reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const formAction = reactive({ ...formActionDefault })

  // 🆕 NEW: Initialize user data after signup
  const initializeUserData = async (userId) => {
    try {
      // Insert user_stats
      await supabase.from('user_stats').insert({
        user_id: userId,
        xp: 0,
        coins: 0,
        lessons_completed: 0,
        quizzes_completed: 0,
      })

      // Insert user_streaks
      await supabase.from('user_streaks').insert({
        user_id: userId,
        current_streak: 0,
        longest_streak: 0,
        last_active_date: null,
      })

      // Insert user_powerups
      await supabase.from('user_powerups').insert({
        user_id: userId,
        hearts: 5,
        max_hearts: 5,
        xp_boost: 0,
        shield: 0,
        double_xp_active: false,
        answer_protection_active: false,
        streak_saver_active: false,
      })

      console.log('✅ User data initialized successfully')
    } catch (error) {
      console.error('❌ Error initializing user data:', error)
      // Don't throw - user is still created
    }
  }

  const onFormSubmit = async () => {
    const { valid } = await refVForm.value.validate()
    if (!valid) return

    try {
      formAction.formProcess = true
      formAction.formErrorMessage = ''
      formAction.formSuccessMessage = ''

      const firstName = formData.firstname.trim()
      const lastName = formData.lastname.trim()
      const fullName = `${firstName} ${lastName}`

      // 🔹 Sign up user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
        options: {
          data: {
            name: fullName,
            first_name: firstName,
            last_name: lastName,
            role: 'Student',
          },
        },
      })

      if (error) throw error

      // 🆕 Initialize user data tables
      if (data.user) {
        await initializeUserData(data.user.id)
      }

      formAction.formSuccessMessage =
        'Registration successful! Please check your email to verify your account.'

      refVForm.value.reset()
    } catch (err) {
      formAction.formErrorMessage = err?.message || 'Registration failed. Please try again.'
    } finally {
      formAction.formProcess = false
    }
  }

  return { refVForm, formData, formAction, onFormSubmit }
}
