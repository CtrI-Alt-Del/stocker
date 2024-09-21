'use client'

import { type RefObject, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  booleanSchema,
  descriptionSchema,
  fileSchema,
  idSchema,
  integerSchema,
  nameSchema,
  nonZeroIntegerSchema,
  stringSchema,
} from '@stocker/validation/schemas'
import type { ProductDto } from '@stocker/core/dtos'

import { useApi, useToast } from '@/ui/hooks'
import type { ImageInputRef } from '@/ui/components/commons/image-input/types'

const updateProductFormSchema = z.object({
  updatedImage: fileSchema.optional(),
  name: nameSchema,
  uom: stringSchema,
  description: descriptionSchema,
  costPrice: integerSchema,
  sellingPrice: integerSchema,
  height: integerSchema,
  length: integerSchema,
  weight: integerSchema,
  width: integerSchema,
  brand: stringSchema,
  code: stringSchema,
  minimumStock: nonZeroIntegerSchema,
  categoryId: idSchema.optional(),
  model: z.string().optional(),
  isActive: booleanSchema.default(true),
})

type UpdateProductFormData = z.infer<typeof updateProductFormSchema>

type UseUpdateProductFormProps = {
  productDto: ProductDto
  imageInputRef: RefObject<ImageInputRef>
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export function useUpdateProductForm({
  productDto,
  imageInputRef,
  onSubmit,
  onCancel,
}: UseUpdateProductFormProps) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<UpdateProductFormData>({
      defaultValues: {
        brand: productDto.brand,
        costPrice: productDto.costPrice,
        description: productDto.description,
        height: productDto.height,
        length: productDto.length,
        name: productDto.name,
        isActive: productDto.isActive,
        code: productDto.code,
        uom: productDto.uom,
        weight: productDto.weight,
        width: productDto.width,
        minimumStock: productDto.minimumStock,
        sellingPrice: productDto.sellingPrice,
        model: productDto.model ?? undefined,
        ...(productDto.model ? { model: productDto.model } : null),
      },
      resolver: zodResolver(updateProductFormSchema),
    })
  const { fileStorageService, productsService } = useApi()
  const { showSuccess, showError } = useToast()

  function handleCancelButtonClick() {
    reset()
    imageInputRef.current?.reset()
    onCancel()
  }

  async function handleImageUpload(formImageFile?: File) {
    let imageUrl = ''

    if (formImageFile) {
      const deleteImageResponse = await fileStorageService.deleteImage(productDto.image)

      if (deleteImageResponse.isFailure) {
        alert(deleteImageResponse.errorMessage)
        return
      }

      const uploadImageResponse = await fileStorageService.uploadImage(formImageFile)

      if (uploadImageResponse.isFailure) {
        alert(uploadImageResponse.errorMessage)
        return
      }

      imageUrl = uploadImageResponse.body.imageUrl
    }

    return imageUrl
  }

  async function handleFormSubmit(formData: UpdateProductFormData) {
    const imageUrl = await handleImageUpload(formData.updatedImage)

    const partialProductDto: Record<string, unknown> = {}

    const updatedFields = Object.keys(formState.dirtyFields)
    for (const updatedField of updatedFields) {
      if (updatedField === 'image') continue

      const updatedValue = formData[updatedField as keyof UpdateProductFormData]
      partialProductDto[updatedField] = updatedValue
    }

    if (imageUrl) partialProductDto.image = imageUrl

    if (!productDto.id) return

    const response = await productsService.updateProduct(
      partialProductDto as Partial<ProductDto>,
      productDto.id,
    )

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Produto atualizado com sucesso')
      imageInputRef.current?.reset()
      reset()
      onCancel()
      onSubmit()
    }
  }

  return {
    control,
    errors: formState.errors,
    isDirty: formState.isDirty,
    isSubmiting: formState.isSubmitting,
    register,
    handleCancelButtonClick,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
