'use client'

import { type RefObject, useState } from 'react'
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
import { useApi } from '@/ui/hooks'
import { Product } from '@stocker/core/entities'
import type { ImageInputRef } from '@/ui/components/commons/image-input/types'

const registerProductFormSchema = z.object({
  image: fileSchema.optional(),
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
  model: stringSchema.optional(),
  isActive: booleanSchema.default(true),
})

type RegisterProductFormData = z.infer<typeof registerProductFormSchema>

export function useRegisterProductForm(
  onSubmit: VoidFunction,
  imageInputRef: RefObject<ImageInputRef>,
) {
  const { control, formState, reset, register, handleSubmit } =
    useForm<RegisterProductFormData>({
      resolver: zodResolver(registerProductFormSchema),
    })
  const { fileStorageService, productsService } = useApi()
  const [isSubmiting, setIsSubmiting] = useState(false)

  async function handleFormSubmit(formData: RegisterProductFormData) {
    setIsSubmiting(true)
    let imageUrl = ''

    if (formData.image) {
      const response = await fileStorageService.uploadImage(formData.image)

      if (response.isFailure) {
        alert(response.errorMessage)
        setIsSubmiting(true)
        return
      }
      imageUrl = response.body.imageUrl
    }

    const product = Product.create({
      name: formData.name,
      uom: formData.uom,
      description: formData.description,
      costPrice: formData.costPrice,
      sellingPrice: formData.sellingPrice,
      height: formData.height,
      length: formData.length,
      weight: formData.weight,
      width: formData.width,
      code: formData.code,
      minimumStock: formData.minimumStock,
      categoryId: formData.categoryId,
      model: formData.model,
      isActive: formData.isActive,
      brand: formData.brand,
      image: imageUrl,
      companyId: 'eceda392-06df-4ed2-8c90-db6bf1e38830',
    })

    const response = await productsService.registerProduct(product)

    if (response.isFailure) {
      alert(response.errorMessage)
    }

    if (response.isSuccess) {
      reset()
      imageInputRef.current?.reset()
      onSubmit()
    }

    setIsSubmiting(false)
  }

  return {
    control,
    errors: formState.errors,
    isSubmiting,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
