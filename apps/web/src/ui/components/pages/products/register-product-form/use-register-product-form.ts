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
import { useApi, useToast } from '@/ui/hooks'
import { Product } from '@stocker/core/entities'
import type { ImageInputRef } from '@/ui/components/commons/image-input/types'
import { useAuthContext } from '@/ui/components/contexts/auth-context'

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
  locationId: idSchema.optional(),
  supplierId: idSchema.optional(),
  model: z
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
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
  const { user } = useAuthContext()
  const { showSuccess, showError } = useToast()
  const { fileStorageService, productsService } = useApi()
  const [isSubmiting, setIsSubmiting] = useState(false)

  async function handleFormSubmit(formData: RegisterProductFormData) {
    setIsSubmiting(true)
    let imageUrl = ''

    if (formData.image) {
      const response = await fileStorageService.uploadImage(formData.image)

      if (response.isFailure) {
        alert(response.errorMessage)
        setIsSubmiting(false)
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
      category: formData.categoryId ? { id: formData.categoryId } : undefined,
      supplier: formData.supplierId ? { id: formData.supplierId } : undefined,
      location: formData.locationId ? { id: formData.locationId } : undefined,
      model: formData.model,
      isActive: formData.isActive,
      brand: formData.brand,
      image: imageUrl,
      companyId: user?.companyId || ' ',
    })

    const response = await productsService.registerProduct(product)

    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Produto cadastrado com sucesso')
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
