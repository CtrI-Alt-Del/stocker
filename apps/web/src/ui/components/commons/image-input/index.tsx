import {
  type ForwardedRef,
  forwardRef,
  useRef,
  type ComponentProps,
  useImperativeHandle,
} from 'react'
import { Image } from '@nextui-org/react'

import type { DialogRef } from '../dialog/types'
import { useImageInput } from './use-image-input'
import type { ImageInputRef } from './types'

type ImageInputProps = {
  name?: string
  defaultImage?: string
  onChange: (imageFile: File) => void
} & ComponentProps<'input'>

export const ImageInputComponent = (
  { name, defaultImage, onChange, ...inputProps }: ImageInputProps,
  ref: ForwardedRef<ImageInputRef>,
) => {
  const modalRef = useRef<DialogRef>(null)
  const { image, reset, handleInputFileChange } = useImageInput({
    defaultImage,
    modalRef,
    onChange,
  })
  useImperativeHandle(
    ref,
    () => {
      return {
        reset,
      }
    },
    [reset],
  )

  return (
    <>
      <label
        htmlFor={name}
        className='grid place-content-center overflow-hidden w-[310px] h-[220px] cursor-pointer rounded-md border border-dashed border-zinc-500 bg-zinc-50'
      >
        {image ? (
          <Image
            src={image}
            alt='preview da imagem'
            radius='none'
            width={310}
            height={220}
            className='object-cover'
          />
        ) : (
          <p className='text-zinc-500'>Carreque sua imagem aqui.</p>
        )}
        <input
          id={name}
          type='file'
          name={name}
          accept='image/*'
          onChange={handleInputFileChange}
          onReset={() => alert('reset')}
          className='sr-only'
          {...inputProps}
        />
      </label>
    </>
  )
}

export const ImageInput = forwardRef(ImageInputComponent)
