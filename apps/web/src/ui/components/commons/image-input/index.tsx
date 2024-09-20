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
  onChange: (imageFile: File) => void
} & ComponentProps<'input'>

export const ImageInputComponent = (
  { onChange, ...inputProps }: ImageInputProps,
  ref: ForwardedRef<ImageInputRef>,
) => {
  const modalRef = useRef<DialogRef>(null)
  const cropperRef = useRef(null)
  const { image, reset, handleInputFileChange } = useImageInput(
    modalRef,
    cropperRef,
    onChange,
  )
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
        htmlFor='image'
        className='grid place-content-center overflow-hidden w-[310px] h-[220px] cursor-pointer rounded-md border border-dashed border-zinc-500 bg-zinc-50'
      >
        {image ? (
          <Image
            src={image}
            alt='cropped image'
            radius='none'
            width={310}
            height={220}
            className='object-cover'
          />
        ) : (
          <p className='text-zinc-500'>Carreque sua imagem aqui.</p>
        )}
        <input
          id='image'
          type='file'
          name='image'
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
