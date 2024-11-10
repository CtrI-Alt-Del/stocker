'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  cnpjSchema,
  companyNameSchema,
  emailSchema,
  nameSchema,
} from '@stocker/validation/schemas'

import { useAuthContext } from '@/ui/components/contexts/auth-context'

const USER_FIELDS = ['name', 'email']
const COMPANY_FIELDS = ['companyName', 'cnpj']

const updateProfileFormSchema = z.object({
  name: nameSchema,
  companyName: companyNameSchema,
  cnpj: cnpjSchema,
  email: emailSchema,
})

type ProfileFormData = z.infer<typeof updateProfileFormSchema>
export function useProfileForm() {
  const { user, company, updateAccount } = useAuthContext()
  const { formState, register, setValue, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name,
      companyName: company?.name,
      cnpj: company?.cnpj,
      email: user?.email,
    },
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleFormSubmit(formData: ProfileFormData) {
    if (!user || !company) return

    const updatedFields = Object.keys(formState.dirtyFields)

    let userDto = {}
    let companyDto = {}

    for (const updatedField of updatedFields) {
      const updatedValue = formData[updatedField as keyof ProfileFormData]

      if (USER_FIELDS.includes(updatedField)) {
        userDto = { ...userDto, [updatedField]: updatedValue }
      }

      if (COMPANY_FIELDS.includes(updatedField)) {
        companyDto = { ...companyDto, [updatedField]: updatedValue }
      }
    }

    await updateAccount(userDto, companyDto)
  }

  useEffect(() => {
    if (!user || !company) return

    setValue('name', user.name)
    setValue('email', user.email)
    setValue('companyName', company.name)
    setValue('cnpj', company.cnpj)
  }, [user, company, setValue])

  return {
    company,
    errors: formState.errors,
    isDirty: formState.isDirty,
    isSubmiting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
