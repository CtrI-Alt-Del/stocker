import { Button, Input } from '@nextui-org/react'
import { useRegisterLocationForm } from './use-register-location-form'

type RegisterLocationFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
  parentLocationId?: string
}

export const RegisterLocationForm = ({
  onSubmit,
  parentLocationId,
  onCancel,
}: RegisterLocationFormProps) => {
  const { errors, isSubmiting, register, handleSubmit } = useRegisterLocationForm({
    onSubmit,
    parentLocationId,
  })

  return (
    <div>
      <h2 className='text-xl font-bold'>
        {parentLocationId ? 'Cadastrar Setor' : 'Cadastrar Local'}{' '}
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
            isLoading={isSubmiting}
            className='text-orange'
          >
            <span className='text-zinc-50'>Confirmar</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
