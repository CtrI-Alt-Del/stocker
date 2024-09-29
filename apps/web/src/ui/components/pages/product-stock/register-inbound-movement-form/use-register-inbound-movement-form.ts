import { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { inventoryMovementSchema, batchSchema } from '@stocker/validation/schemas'
import { Batch, InventoryMovement } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'

import { useApi, useToast } from '@/ui/hooks'

const registerInboundMovementFormSchema = z.intersection(
  inventoryMovementSchema,
  batchSchema,
)

type RegisterInboundMovementFormData = z.infer<typeof registerInboundMovementFormSchema>

export function useRegisterInboundMovementForm(
  productId: string,
  onSubmit: (newBatch: Batch) => Promise<void>,
) {
  const { control, formState, setValue, reset, register, handleSubmit } =
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
      responsible: {
        id: '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa',
      },
      product: {
        id: productId,
      },
    })

    if (formData.expirationDate) {
      formData.expirationDate = new Datetime(formData.expirationDate).addDays(1)
    }

    const batch = Batch.create({
      code: formData.code,
      expirationDate: formData.expirationDate?.toDateString(),
      maximumDaysToExpiration: formData.maximumDaysToExipiration,
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

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  })

  useEffect(() => {
    if (isIntersecting) setValue('registeredAt', new Date())
  }, [isIntersecting, setValue])

  return {
    control,
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    formRef: ref,
    setValue,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
