'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'

import { batchSchema } from '@stocker/validation/schemas'
import type { Batch } from '@stocker/core/entities'
import type { BatchDto } from '@stocker/core/dtos'
import { Datetime } from '@stocker/core/libs'

import { useApi, useToast } from '@/ui/hooks'

type UpdateBatchFormData = z.infer<typeof batchSchema>

export function useUpdateBatchForm(
  batch: Batch,
  onSubmit: (updatedBatchDto: Partial<BatchDto>) => void,
) {
  console.log(batch)
  const { formState, control, register, handleSubmit } = useForm<UpdateBatchFormData>({
    defaultValues: {
      code: batch.code,
      itemsCount: batch.itemsCount,
      expirationDate: batch.expirationDate ?? undefined,
      maximumDaysToExipiration: batch.maximumDaysToExpiration ?? undefined,
    },
    resolver: zodResolver(batchSchema),
  })
  const { showSuccess, showError } = useToast()
  const { batchesService } = useApi()

  async function handleFormSubmit(formData: UpdateBatchFormData) {
    const partialBatchDto: Partial<BatchDto> = {
      itemsCount: formData.itemsCount,
      code: formData.code,
      expirationDate: formData.expirationDate
        ? new Datetime(formData.expirationDate).addDays(1)
        : undefined,
    }

    const response = await batchesService.updateBatch(partialBatchDto, batch.id)

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Lote atualizado com sucesso')
      onSubmit(partialBatchDto)
    }
  }

  return {
    errors: formState.errors,
    isSubmiting: formState.isSubmitting,
    control,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
