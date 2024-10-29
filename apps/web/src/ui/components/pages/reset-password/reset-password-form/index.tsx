import { Button, Input } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Icon } from '@/ui/components/commons/icon'
import { useResetPasswordForm } from './use-reset-password-form'
import Link from 'next/link'

export const ResetPasswordForm = () => {
  const { register, errors, handleSubmit, isSucess } = useResetPasswordForm()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const iconVariants = {
    open: { scale: 1.1, transition: { duration: 0.3, type: 'spring' } },
    closed: { scale: 0.9, transition: { duration: 0.3, type: 'spring' } },
  }

  const togglePassword = () => setShowPassword(!showPassword)
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  return isSucess ? (
    <div className='w-full h-full grid grid-rows-2  '>
      <h1 className='font-bold md:text-4xl text-xl  flex  justify-center items-center whitespace-nowrap'>
        Senha redefinida com sucesso!
      </h1>
      <Button
        as={Link}
        href='/login'
        color='primary'
        size='md'
        className='h-14 font-bold text-sm md:text-lg'
        radius='lg'
      >
        Voltar para fazer login
      </Button>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className='grid grid-rows-4 gap-8 md:gap-2 w-full h-full'
    >
      <div className='flex items-center flex-col justify-center'>
        <h1 className='font-bold md:text-4xl text-xl'>Redefinindo sua senha</h1>
        <p className='sm:text-md text-md text-default-400'>
          Digite sua nova senha e confirme para prosseguir
        </p>
      </div>
      <Input
        {...register('password')}
        type={showPassword ? 'text' : 'password'}
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password?.message}
        label='Nova senha'
        size='md'
        labelPlacement='outside'
        placeholder='Nova Senha'
        endContent={
          <motion.div
            className='cursor-pointer'
            onClick={togglePassword}
            animate={showPassword ? 'open' : 'closed'}
            variants={iconVariants}
            whileTap={{ scale: 0.8 }}
          >
            <Icon
              name={showPassword ? 'view' : 'eye-closed'}
              className='size-5 text-default-500'
            />
          </motion.div>
        }
      />
      <Input
        {...register('confirmPassword')}
        type={showConfirmPassword ? 'text' : 'password'}
        isInvalid={Boolean(errors.confirmPassword)}
        errorMessage={errors.confirmPassword?.message}
        label='Confirme sua senha'
        size='md'
        labelPlacement='outside'
        placeholder='Confirmar Senha'
        endContent={
          <motion.div
            className='cursor-pointer'
            onClick={toggleConfirmPassword}
            animate={showConfirmPassword ? 'open' : 'closed'}
            variants={iconVariants}
            whileTap={{ scale: 0.8 }}
          >
            <Icon
              name={showConfirmPassword ? 'view' : 'eye-closed'}
              className='size-5 text-default-500'
            />
          </motion.div>
        }
      />
      <Button
        color='primary'
        size='md'
        className='h-14 font-bold text-sm md:text-lg'
        radius='lg'
        type='submit'
      >
        Redefinir senha
      </Button>
    </form>
  )
}
