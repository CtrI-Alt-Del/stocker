'use client'

import { useRef } from 'react'
import { Controller } from 'react-hook-form'
import { Button, Divider, Input, Switch, Textarea } from '@nextui-org/react'

import { useRegisterProductForm } from './use-register-product-form'
import { ImageInput } from '@/ui/components/commons/image-input'
import type { ImageInputRef } from '@/ui/components/commons/image-input/types'
import { CategorySelect } from '@/ui/components/commons/category-select'
import { SupplierSelect } from '@/ui/components/commons/supplier-select'
import { LocationSelect } from '@/ui/components/commons/location-select'

type RegisterProductFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export const RegisterProductForm = ({ onSubmit, onCancel }: RegisterProductFormProps) => {
  const imageInputRef = useRef<ImageInputRef>(null)
  const { control, errors, isSubmiting, register, handleSubmit } = useRegisterProductForm(
    onSubmit,
    imageInputRef,
  )

  return (
    <form onSubmit={handleSubmit} encType='multiform/form-data' className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='grid grid-cols-1 grid-rows-3 gap-6'>
          <Input
            label='Nome'
            isRequired
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            {...register('name')}
          />
          <Input
            label='Código do produto'
            isRequired
            isInvalid={Boolean(errors.code)}
            errorMessage={errors.code?.message}
            {...register('code')}
          />
          <Input
            label='Estoque mínimo'
            type='number'
            isRequired
            isInvalid={Boolean(errors.minimumStock)}
            errorMessage={errors.minimumStock?.message}
            {...register('minimumStock')}
          />
        </div>
        <Controller
          name='image'
          control={control}
          render={({ field: { onChange } }) => (
            <ImageInput ref={imageInputRef} name='image' onChange={onChange} />
          )}
        />
      </div>

      <Textarea
        label='Descrição'
        isRequired
        isInvalid={Boolean(errors.description)}
        errorMessage={errors.description?.message}
        {...register('description')}
      />

      <div className='grid grid-cols-2 gap-6'>
        <Controller
          name='supplierId'
          control={control}
          render={({ field: { onChange } }) => (
            <div className='w-full '>
              <SupplierSelect onSelectChange={onChange} className='w-full' />
              {errors.supplierId && (
                <p className='text-red-600 text-sm'>{errors.supplierId?.message}</p>
              )}
            </div>
          )}
        />
        <Input
          label='Unidade'
          isRequired
          isInvalid={Boolean(errors.uom)}
          {...register('uom')}
          errorMessage={errors.uom?.message}
        />
      </div>

      <div className='grid  grid-cols-2 gap-3'>
        <Controller
          name='categoryId'
          control={control}
          render={({ field: { onChange } }) => (
            <div className='w-full '>
              <CategorySelect onSelectChange={onChange} className='w-full' />
              {errors.categoryId && (
                <p className='text-red-600 text-sm'>{errors.categoryId?.message}</p>
              )}
            </div>
          )}
        />
        <div className='flex gap-3'>
          <Input
            type='number'
            label='Preço de custo'
            placeholder='R$'
            isRequired
            errorMessage={errors.costPrice?.message}
            isInvalid={Boolean(errors.costPrice)}
            {...register('costPrice')}
          />
          <Input
            type='number'
            label='Preço de venda'
            placeholder='R$'
            isRequired
            errorMessage={errors.sellingPrice?.message}
            isInvalid={Boolean(errors.sellingPrice)}
            {...register('sellingPrice')}
          />
        </div>
      </div>

      <Divider className='my-2' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input
          type='number'
          label='Peso'
          placeholder='kg'
          isRequired
          errorMessage={errors.weight?.message}
          isInvalid={Boolean(errors.weight)}
          {...register('weight')}
        />
        <Input
          type='number'
          label='Largura'
          placeholder='cm'
          isRequired
          errorMessage={errors.width?.message}
          isInvalid={Boolean(errors.width)}
          {...register('width')}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input
          type='number'
          label='Comprimento'
          placeholder='cm'
          isRequired
          {...register('length')}
          isInvalid={Boolean(errors.length)}
          errorMessage={errors.length?.message}
        />
        <Input
          type='number'
          label='Altura'
          placeholder='cm'
          isRequired
          isInvalid={Boolean(errors.height)}
          errorMessage={errors.height?.message}
          {...register('height')}
        />
      </div>

      <Divider className='my-2' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Controller
          name='locationId'
          control={control}
          render={({ field: { onChange } }) => (
            <div className='w-full '>
              <LocationSelect onSelectChange={onChange} className='w-full' />
              {errors.categoryId && (
                <p className='text-red-600 text-sm'>{errors.categoryId?.message}</p>
              )}
            </div>
          )}
        />
        <Input
          label='Marca'
          isRequired
          errorMessage={errors.brand?.message}
          isInvalid={Boolean(errors.brand)}
          {...register('brand')}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Switch defaultSelected {...register('isActive')}>
          Ativo
        </Switch>
        <Input
          label='Modelo'
          errorMessage={errors.model?.message}
          isInvalid={Boolean(errors.model)}
          {...register('model')}
        />
      </div>

      <div className='flex items-center gap-3'>
        <Button onClick={onCancel} isDisabled={isSubmiting}>
          Cancelar
        </Button>
        <Button
          type='submit'
          color='primary'
          className='text-orange'
          isLoading={isSubmiting}
        >
          <p className='text-white'>Cadastrar</p>
        </Button>
      </div>
    </form>
  )
}
