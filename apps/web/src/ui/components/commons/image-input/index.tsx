import {
  type ForwardedRef,
  forwardRef,
  useRef,
  type ComponentProps,
  useImperativeHandle,
} from 'react'
import { Button, Image } from '@nextui-org/react'
import { Cropper, type ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import type { DialogRef } from '../dialog/types'
import { useImageInput } from './use-image-input'
import type { ImageInputRef } from './types'
import { Dialog } from '../dialog'

type ImageInputProps = {
  name?: string
  defaultImage?: string
  onChange: (imageFile: File) => void
} & ComponentProps<'input'>

export const ImageInputComponent = (
  { name, defaultImage, onChange, ...inputProps }: ImageInputProps,
  ref: ForwardedRef<ImageInputRef>,
) => {
  const dialogRef = useRef<DialogRef>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const { image, previewImage, reset, handleInputFileChange, handleImageCrop } =
    useImageInput({
      defaultImage,
      dialogRef,
      cropperRef,
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
      <Dialog ref={dialogRef} title='Cortando imagem' isLarge>
        {() => (
          <>
            <Cropper
              ref={cropperRef}
              src={previewImage}
              aspectRatio={1}
              className='w-full h-full'
              guides
            />
            <Button color='primary' onClick={handleImageCrop}>
              Cortar imagem
            </Button>
          </>
        )}
      </Dialog>
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
            height={260}
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
