import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema } from '@stocker/validation/schemas'

import { useAuthContext } from '../../contexts/auth-context'
import { type RefObject, useEffect } from 'react'
import type { DialogRef } from '../dialog/types'

const FirstPasswordEntryModalSchema = z.object({
  password: passwordSchema,
})
type FirstPasswordEntryModalData = z.infer<typeof FirstPasswordEntryModalSchema>
export function useFirstPasswordEntryModal(dialogRef: RefObject<DialogRef>) {
  const { user, resetPassword } = useAuthContext()
  const { formState, control, handleSubmit } = useForm<FirstPasswordEntryModalData>({
    resolver: zodResolver(FirstPasswordEntryModalSchema),
  })

  async function handleFormSubmit(formData: FirstPasswordEntryModalData) {
    if (!user) return

    await resetPassword(user.email, formData.password)
    dialogRef.current?.close()
  }

  useEffect(() => {
    dialogRef.current?.open()
  }, [dialogRef.current?.open])

  return {
    isSubmiting: formState.isSubmitting,
    errors: formState.errors,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
