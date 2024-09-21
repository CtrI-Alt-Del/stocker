import { type RefObject, useState, type ChangeEvent, useEffect, useCallback } from 'react'
import type { ReactCropperElement } from 'react-cropper'

import type { DialogRef } from '../dialog/types'

type UseImageInputProps = {
  defaultImage?: string
  modalRef: RefObject<DialogRef>
  onChange: (file: File) => void
}

export function useImageInput({ defaultImage, onChange }: UseImageInputProps) {
  const [image, setImage] = useState(defaultImage ?? '')

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
    return () => {
      URL.revokeObjectURL(image)
    }
  }, [image])

  console.log(image)

  return {
    image,
    reset,
    handleInputFileChange,
  }
}
