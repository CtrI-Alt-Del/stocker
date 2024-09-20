import { type RefObject, useState, type ChangeEvent, useEffect, useCallback } from 'react'
import type { ReactCropperElement } from 'react-cropper'

import type { DialogRef } from '../dialog/types'

export function useImageInput(
  modalRef: RefObject<DialogRef>,
  cropperRef: RefObject<ReactCropperElement>,
  onChange: (file: File) => void,
) {
  const [image, setImage] = useState<string>('')

  const reset = useCallback(() => {
    setImage('')
  }, [])

  function handleInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0)

    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
      onChange(file)
    }
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(image)
  }, [image])

  return {
    image,
    reset,
    handleInputFileChange,
  }
}
