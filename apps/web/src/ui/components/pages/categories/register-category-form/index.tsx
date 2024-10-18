import { Button, Input } from '@nextui-org/react'

import { useRegisterCategoryForm } from './use-register-category-form'
import { CategoryDto } from '@stocker/core/dtos'

type RegisterCategoryFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
  parentCategoryId?: string
}

export const RegisterCategoryForm = ({
  onSubmit,
  parentCategoryId,
  onCancel,
}: RegisterCategoryFormProps) => {
  const { errors, isSubmiting, registerField, handleSubmit } = useRegisterCategoryForm({
    onSubmit,
    parentCategoryId,
  })

  return (
    <div>
      <h2 className='text-xl font-bold'>{parentCategoryId ? "Cadastrar Subcategoria" : "Cadastrar Categoria"} </h2>
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
          {...registerField('name')}
        />

        <div className='flex items-center gap-3'>
          <Button onClick={onCancel} isDisabled={isSubmiting}>
            Cancelar
          </Button>
          <Button type='submit' color='primary' isLoading={isSubmiting}>
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  )
}
