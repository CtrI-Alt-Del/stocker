import { Input } from '@nextui-org/react'

import { Icon } from '../icon'

type SearchComponentsProps = {
  value?: string
  onSearchChange?: (value: string) => void
}

export const Search = ({ onSearchChange, value }: SearchComponentsProps) => {
  return (
    <Input
      placeholder='Pesquise por nome'
      size='md'
      color='default'
      radius='sm'
      classNames={{
        inputWrapper: ['bg-zinc-100', 'h-12'],
      }}
      className='w-full max-w-96'
      endContent={<Icon name='search' className='text-zinc-300' />}
      value={value}
      onValueChange={onSearchChange}
    />
  )
}
