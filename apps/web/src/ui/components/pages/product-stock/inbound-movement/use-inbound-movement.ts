
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerInboundMovementFormSchema = z.object({
  expireDate: z.string().datetime(),
  creationDate: z.string().datetime(),
  batchCode: z.string().min(1).max(50),
  quantity: z.number().min(1),
  description: z.string().max(500).optional()
})

type RegisterInboundMovementFormData = z.infer<typeof registerInboundMovementFormSchema>

export function useRegisterInboundMovement() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInboundMovementFormData>({
    resolver: zodResolver(registerInboundMovementFormSchema),
  })

  function handleFormSubmit(data: RegisterInboundMovementFormData) {
    console.log(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
  }
}
