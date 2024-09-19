import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerProductFormSchema = z.object({
  image: z.instanceof(FileList).transform((fileList) => fileList.item(0)),
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  costPrice: z.number(),
  sellingPrice: z.number(),
  height: z.number(),
  length: z.number(),
  weight: z.number(),
  width: z.number(),
  uom: z.number(),
  code: z.string(),
  model: z.string(),
  minimumStock: z.number().min(1),
  categoryId: z.string(),
})

type RegisterProductFormData = z.infer<typeof registerProductFormSchema>

export function useRegisterProductForm() {
  const { register, handleSubmit } = useForm<RegisterProductFormData>({
    resolver: zodResolver(registerProductFormSchema),
  })

  function handleFormSubmit() {}

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
