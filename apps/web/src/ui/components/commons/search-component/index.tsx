import { Input } from '@nextui-org/react'
import { Search } from 'lucide-react'
import { useState, useCallback, useMemo } from 'react'

interface SearchComponentsProps {
  onSearchChange: (value: string) => void
  filterByNameValue: string
}

export const TableSearchComponent = ({
  onSearchChange,
  filterByNameValue,
}: SearchComponentsProps) => {
  return useMemo(() => {
    return (
      <Input
        placeholder='Pesquise por nome'
        size='md'
        color='default'
        radius='sm'
        classNames={{
          inputWrapper: ['bg-zinc-100', 'h-12'],
          placeholder: 'text-zinc-300',
        }}
        className='w-[40rem] max-w-96'
        endContent={<Search className='text-zinc-300' />}
        value={filterByNameValue}
        onValueChange={onSearchChange}
      />
    )
  }, [filterByNameValue, onSearchChange])
}
