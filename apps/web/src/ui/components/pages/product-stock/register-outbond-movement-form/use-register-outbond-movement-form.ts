import { useApi, useToast } from '@/ui/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import {  InventoryMovement } from '@stocker/core/entities'
import {
  dateSchema,
  descriptionSchema,
  nonZeroIntegerSchema,
} from '@stocker/validation/schemas'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIntersectionObserver } from 'usehooks-ts'
import { z } from 'zod'

const registerOutboundMovementFormSchema = z.object({
  registeredAt: dateSchema,
  itemsCount: nonZeroIntegerSchema,
  remark: descriptionSchema
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
})
type RegisterInboundMovementFormData = z.infer<typeof registerOutboundMovementFormSchema>
export function useRegisterOutbondMovementForm(
  productId: string,
  onSubmit: (newMovement: InventoryMovement) => Promise<void>,
) {
  const { control, formState, setValue, reset, register, handleSubmit } =
    useForm<RegisterInboundMovementFormData>({
      defaultValues: {
        registeredAt: new Date(),
      },

      resolver: zodResolver(registerOutboundMovementFormSchema),
    })

  const { showError, showSuccess } = useToast()
  const { inventoryMovementService } = useApi()

  async function handleFormSubmit(formData: RegisterInboundMovementFormData) {
    const outboundMovement = InventoryMovement.create({
      movementType: 'outbound',
      registeredAt: formData.registeredAt,
      itemsCount: formData.itemsCount,
      remark: formData.remark,
      
      responsibleId: '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa',
      productId,
    })

    const response =
      await inventoryMovementService.registerOutbondMovement(outboundMovement)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      showSuccess('Lançamento de saída realizado! ')
      reset()
      onSubmit(outboundMovement)
    }
  }
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 })
  useEffect(() => {
    if (isIntersecting) setValue('registeredAt', new Date())
  }, [isIntersecting, setValue])
  return {
    control,
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    formRef: ref,
    register,
    handleSubmit: handleSubmit(handleFormSubmit)
  }
}
