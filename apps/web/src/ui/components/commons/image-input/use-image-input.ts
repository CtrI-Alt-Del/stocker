import { type RefObject, useState, type ChangeEvent, useEffect, useCallback } from 'react'
import type { ReactCropperElement } from 'react-cropper'

import type { DialogRef } from '../dialog/types'

type UseImageInputProps = {
  defaultImage?: string
  dialogRef: RefObject<DialogRef>
  cropperRef: RefObject<ReactCropperElement>
  onChange: (file: File) => void
}

export function useImageInput({
  defaultImage,
  cropperRef,
  dialogRef,
  onChange,
}: UseImageInputProps) {
  const [image, setImage] = useState(defaultImage ?? '')
  const [previewImage, setPreviewImage] = useState<string>('')

  const reset = useCallback(() => {
    setImage('')
  }, [])

  function handleImageCrop() {
    const canvas = cropperRef.current?.cropper.getCroppedCanvas()
    if (!canvas) return

    const croppedImage = canvas.toDataURL()

    canvas.toBlob((blob) => {
      if (!blob) return

      const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpg' })
      onChange(file)
    })

    if (croppedImage) {
      setImage(croppedImage)
    }
    dialogRef.current?.close()
  }

  function handleInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0)

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
      dialogRef.current?.open()
    }
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image)
    }
  }, [image])

  return {
    image,
    previewImage,
    reset,
    handleImageCrop,
    handleInputFileChange,
  }
}
