
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { dateSchema, dateTimeSchema, descriptionSchema, integerSchema, stringSchema } from '@stocker/validation/schemas'
import { z } from 'zod'
import { useState } from 'react'
import { useApi } from '@/ui/hooks'
import { InventoryMovement } from '@stocker/core/entities'

const registerInboundMovementFormSchema = z.object({
  expireDate: dateSchema,
  registeredAt: dateSchema,
  batchCode: stringSchema,
  itemsQuantity: integerSchema,
  description: descriptionSchema
})

type RegisterInboundMovementFormData = z.infer<typeof registerInboundMovementFormSchema>

export function useRegisterInboundMovement(onSubmit: VoidFunction) {
  const { control, formState, reset, register, handleSubmit } = useForm<RegisterInboundMovementFormData>({ resolver: zodResolver(registerInboundMovementFormSchema) })

  const [isSubmiting, setIsSubmitting] = useState(false)
  const {inventoryMovementService: movementService} = useApi()

  async function handleFormSubmit(formData: RegisterInboundMovementFormData){
    setIsSubmitting(true)

    const inboundMovement = InventoryMovement.create({
      batchCode: formData.batchCode,
      registeredAt: formData.registeredAt,
      itemsQuantity: formData.itemsQuantity,
      expireDate: formData.expireDate,
      responsibleId: '123',
      productId: "idk",
      movementType: 'inbound',
      description: formData.description
       
    })
    const response = await movementService.registerInboundMovement(inboundMovement)

    if (response.isFailure) {
      alert(response.errorMessage)
      
    }
    if (response.isSuccess) {
      reset()
      onSubmit()
      
    }
    setIsSubmitting(false)
  }
  return{
    control,
    errors: formState.errors,
    isSubmiting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit)
  }


}
