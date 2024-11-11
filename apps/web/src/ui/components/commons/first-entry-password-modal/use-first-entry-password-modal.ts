import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema } from '@stocker/validation/schemas'

import { useAuthContext } from '../../contexts/auth-context'

const FirstPasswordEntryModalSchema = z.object({
  password: passwordSchema,
})
type FirstPasswordEntryModalData = z.infer<typeof FirstPasswordEntryModalSchema>
export function useFirstPasswordEntryModal() {
  const { user, resetPassword } = useAuthContext()
  const { formState, control, handleSubmit } = useForm<FirstPasswordEntryModalData>({
    resolver: zodResolver(FirstPasswordEntryModalSchema),
  })

  async function handleFormSubmit(formData: FirstPasswordEntryModalData) {
    if (user) await resetPassword(user.email, formData.password)
  }

  return {
    isSubmiting: formState.isSubmitting,
    errors: formState.errors,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
