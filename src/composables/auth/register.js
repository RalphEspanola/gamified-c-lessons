import { ref, reactive } from 'vue'
import { supabase } from '@/utils/supabase'
import { formActionDefault } from '@/utils/supabase'

export function useRegister() {
  // Form reference
  const refVForm = ref(null)

  // Form data
  const formData = reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  // Form action state
  const formAction = reactive({
    ...formActionDefault,
  })

  const onFormSubmit = async () => {
    const { valid } = await refVForm.value.validate()
    if (!valid) return

    try {
      formAction.formProcess = true
      formAction.formErrorMessage = ''
      formAction.formSuccessMessage = ''

      const fullName = `${formData.firstname} ${formData.lastname}`.trim()

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstname,
            last_name: formData.lastname,
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      formAction.formSuccessMessage =
        'Registration successful! Please check your email to verify your account.'

      // Reset form after success
      refVForm.value.reset()
    } catch (err) {
      formAction.formErrorMessage = err?.message || 'Registration failed. Please try again.'
    } finally {
      formAction.formProcess = false
    }
  }

  return {
    refVForm,
    formData,
    formAction,
    onFormSubmit,
  }
}
