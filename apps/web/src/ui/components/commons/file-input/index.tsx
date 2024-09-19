import type { ComponentProps } from 'react'

type FileInputProps = ComponentProps<'input'>

export const FileInput = ({ ...inputProps }: FileInputProps) => {
  return (
    <label
      htmlFor='image'
      className='grid place-content-center cursor-pointer h-32 w-full rounded-md border border-dashed border-zinc-500 bg-zinc-50'
    >
      <p className='text-zinc-500'>Carreque sua imagem aqui.</p>
      <input id='image' type='file' className='sr-only' {...inputProps} />
    </label>
  )
}
