import { Button, Input } from '@nextui-org/react'

import type { Category } from '@stocker/core/entities'

import { useUpdateCateryForm } from './use-update-category-form'

type RegisterCategoryFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
  category: Category
}

export const UpdateCategoryForm = ({
  category,
  onSubmit,
  onCancel,
}: RegisterCategoryFormProps) => {
  const { errors, isDirty, isSubmiting, register, handleSubmit } = useUpdateCateryForm({
    onSubmit,
    onCancel,
    category,
  })

  return (
    <div>
      <h2 className='text-xl font-bold'>
        {category.hasParentCategory ? 'Atualizar Subcategoria' : 'Atualizar Categoria'}
      </h2>
      <form
        onSubmit={handleSubmit}
        encType='multiform/form-data'
        className='space-y-6 mt-6'
      >
        <Input
          label='Nome'
          isRequired
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
          {...register('name')}
        />

        <div className='flex items-center gap-3'>
          <Button onClick={onCancel} isDisabled={isSubmiting}>
            Cancelar
          </Button>
          <Button
            type='submit'
            color='primary'
            isDisabled={!isDirty}
            isLoading={isSubmiting}
          >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  )
}
