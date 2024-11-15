import { Location } from "@stocker/core/entities"
import { useUpdateLocationForm } from "./use-update-location-form"
import { Button, Input } from "@nextui-org/react"


type UpdateLocationFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
  location: Location
}

export const UpdateLocationForm = ({
  location,
  onSubmit,
  onCancel,
}: UpdateLocationFormProps) => {
  const { errors, isDirty, isSubmitting, register, handleSubmit } = useUpdateLocationForm({
    onSubmit,
    onCancel,
    location,
  })

  return (
    <div>
      <h2 className='text-xl font-bold'>
        {location.hasParentLocation ? 'Atualizar Setor' : 'Atualizar Local'}
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
          <Button onClick={onCancel} isDisabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type='submit'
            color='primary'
            isDisabled={!isDirty}
            isLoading={isSubmitting}
          >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  )
}
