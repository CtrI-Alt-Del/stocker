import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerInboundMovementFormSchema = z.object({
  expireDate: z.string().datetime(),
  creationDate: z.string().datetime(),

  batchCode: z.string().min(1).max(50),
  quantity: z.number().min(1),
  description: z.string().max(500),
})

type RegisterInboundMovementFormData = z.infer<typeof registerInboundMovementFormSchema>

export function useRegisterProductForm() {
  const { register, handleSubmit } = useForm<RegisterInboundMovementFormData>({
    resolver: zodResolver(registerInboundMovementFormSchema),
  })

  function handleFormSubmit() { }

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
