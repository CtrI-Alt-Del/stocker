import { Input, type InputProps } from '@nextui-org/react'

import { usePasswordInput } from './use-password-input'
import { AnimatedIcon } from './animated-icon'

type PasswordInputProps = InputProps & {
  name: string
}

export const PasswordInput = ({ name, ...inputProps }: PasswordInputProps) => {
  const { isPasswordVisible, handleIconClick } = usePasswordInput()

  return (
    <Input
      label='Senha'
      type={isPasswordVisible ? 'text' : 'password'}
      labelPlacement='outside'
      size='md'
      endContent={
        <AnimatedIcon isVisible={isPasswordVisible} onClick={handleIconClick} />
      }
      {...inputProps}
    />
  )
}
