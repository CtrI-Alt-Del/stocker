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

import { useApi, useToast } from '@/ui/hooks'
import type { ImageInputRef } from '@/ui/components/commons/image-input/types'
import type { ProductDto } from '@stocker/core/dtos'
import type { Product } from '@stocker/core/entities'

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
  supplierId: idSchema.optional(),
  model: z.string().optional(),
  isActive: booleanSchema.default(true),
})

type UpdateProductFormData = z.infer<typeof updateProductFormSchema>

type UseUpdateProductFormProps = {
  product: Product
  imageInputRef: RefObject<ImageInputRef>
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export function useUpdateProductForm({
  product,
  imageInputRef,
  onSubmit,
  onCancel,
}: UseUpdateProductFormProps) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<UpdateProductFormData>({
      defaultValues: {
        brand: product.brand,
        description: product.description,
        height: product.height,
        length: product.length,
        name: product.name,
        isActive: product.isActive,
        code: product.code,
        uom: product.uom,
        weight: product.weight,
        width: product.width,
        minimumStock: product.minimumStock,
        costPrice: product.costPrice.value,
        sellingPrice: product.sellingPrice.value,
        model: product.model ?? undefined,
        ...(product.model ? { model: product.model } : null),
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
      if (product.image) {
        const deleteImageResponse = await fileStorageService.deleteImage(product.image)

        if (deleteImageResponse.isFailure) {
          showError(deleteImageResponse.errorMessage)
          return
        }
      }

      const uploadImageResponse = await fileStorageService.uploadImage(formImageFile)

      if (uploadImageResponse.isFailure) {
        showError(uploadImageResponse.errorMessage)
        return
      }

      imageUrl = uploadImageResponse.body.imageUrl
    }

    return imageUrl
  }

  async function handleFormSubmit(formData: UpdateProductFormData) {
    const imageUrl = await handleImageUpload(formData.updatedImage)

    const partialProduct: Record<string, unknown> = {}

    const updatedFields = Object.keys(formState.dirtyFields)
    for (const updatedField of updatedFields) {
      if (updatedField === 'image') continue

      if (updatedField === 'categoryId') {
        partialProduct.category = { id: formData.categoryId }
        continue
      }

      if (updatedField === 'supplierId') {
        partialProduct.supplier = { id: formData.supplierId }
        continue
      }

      const updatedValue = formData[updatedField as keyof UpdateProductFormData]
      partialProduct[updatedField] = updatedValue
    }

    if (imageUrl) partialProduct.image = imageUrl

    if (!product.id) return

    const response = await productsService.updateProduct(
      partialProduct as Partial<ProductDto>,
      product.id,
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
