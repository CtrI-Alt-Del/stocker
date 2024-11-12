import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema } from '@stocker/validation/schemas'

import { useAuthContext } from '../../contexts/auth-context'

const formSchema = z.object({
  password: passwordSchema,
})

type FirstPasswordEntryModalData = z.infer<typeof formSchema>
export function useAdminPasswordConfirmationDialog(
  onConfirm: (isAuthenticated: boolean) => void,
) {
  const { confirmAuth } = useAuthContext()
  const { formState, control, reset, handleSubmit } =
    useForm<FirstPasswordEntryModalData>({
      resolver: zodResolver(formSchema),
    })

  async function handleFormSubmit(formData: FirstPasswordEntryModalData) {
    const isAuthenticated = await confirmAuth(formData.password)
    reset()
    onConfirm(isAuthenticated)
  }

  return {
    isSubmiting: formState.isSubmitting,
    errors: formState.errors,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
