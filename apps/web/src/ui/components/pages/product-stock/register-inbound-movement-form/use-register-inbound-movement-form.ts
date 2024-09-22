import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  dateSchema,
  descriptionSchema,
  nonZeroIntegerSchema,
  stringSchema,
} from '@stocker/validation/schemas'
import { Batch, InventoryMovement } from '@stocker/core/entities'

import { useApi, useToast } from '@/ui/hooks'
import { Datetime } from '@stocker/core/libs'

const registerInboundMovementFormSchema = z.object({
  expirationDate: dateSchema.optional(),
  registeredAt: dateSchema,
  batchCode: stringSchema,
  itemsCount: nonZeroIntegerSchema,
  remark: descriptionSchema
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
})

type RegisterInboundMovementFormData = z.infer<typeof registerInboundMovementFormSchema>

export function useRegisterInboundMovementForm(
  productId: string,
  onSubmit: (newBatch: Batch) => Promise<void>,
) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<RegisterInboundMovementFormData>({
      defaultValues: {
        registeredAt: new Date(),
      },
      resolver: zodResolver(registerInboundMovementFormSchema),
    })
  const { showError, showSuccess } = useToast()
  const { inventoryMovementService } = useApi()

  async function handleFormSubmit(formData: RegisterInboundMovementFormData) {
    const inboundMovement = InventoryMovement.create({
      movementType: 'inbound',
      registeredAt: formData.registeredAt,
      itemsCount: formData.itemsCount,
      remark: formData.remark,
      responsibleId: '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa',
      productId,
    })

    if (formData.expirationDate) {
      formData.expirationDate = new Datetime().addDays(formData.expirationDate, 1)
    }

    const batch = Batch.create({
      code: formData.batchCode,
      expirationDate: formData.expirationDate,
      itemsCount: formData.itemsCount,
      productId,
    })

    const response = await inventoryMovementService.registerInboundMovement(
      inboundMovement,
      batch,
    )

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Lançamento de entrada realizado com sucesso')
      reset()
      onSubmit(batch)
    }
  }
  return {
    control,
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
