import { Button, Input } from '@nextui-org/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSubscribeAdminForm } from './use-subscribe-admin-form'
import { useState } from 'react'
import { boolean } from 'zod'
import { Icon } from '@/ui/components/commons/icon'

export const SubscribeAdminForm = () => {
  const { register, control, handleSubmit, reset, errors } = useSubscribeAdminForm(
    () => { },
  )
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const [showConfirmPassowrd, setShowConfirmPassword] = useState<Boolean>(false)
  const iconVariants = {
    open: { scale: 1.1, transition: { duration: 0.3, type: 'spring' } },
    closed: { scale: 0.9,  transition: { duration: 0.3, type: 'spring' } },
  }
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassowrd)
  }

  return (
    <div className='flex items-center justify-center flex-col flex-1  gap-5 p-6 '>
      <h1 className='text-3xl font-bold w-full text-center'>Cadastre sua conta</h1>
      <form onSubmit={handleSubmit} className='grid grid-rows-5 gap-5 w-full max-w-md'>
        <Input
          label='Nome'
          placeholder='Digite seu nome'
          labelPlacement='outside'
          size='md'
          {...register('adminName')}
          isInvalid={Boolean(errors.adminName)}
          errorMessage={errors.adminName?.message}
        />
        <Input
          label='Email'
          placeholder='Digite seu email'
          labelPlacement='outside'
          size='md'
          {...register('adminEmail')}
          isInvalid={Boolean(errors.adminEmail)}
          errorMessage={errors.adminEmail?.message}
        />
        <Input
          label='Razão Social'
          placeholder='Digite o nome da sua empresa'
          labelPlacement='outside'
          size='md'
          {...register('companyName')}
          isInvalid={Boolean(errors.companyName)}
          errorMessage={errors.companyName?.message}
        />
        <Input
          label='CNPJ'
          placeholder='Digite o CNPJ da sua empresa'
          labelPlacement='outside'
          size='md'
          {...register('CNPJ')}
          isInvalid={Boolean(errors.CNPJ)}
          errorMessage={errors.CNPJ?.message}
        />

        <Input
          label='Senha'
          type={showPassword ? 'text' : 'password'}
          placeholder='Digite sua senha'
          labelPlacement='outside'
          size='md'
          {...register('password')}
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          endContent={
            <motion.div
              className='cursor-pointer'
              onClick={togglePassword}
              animate={showPassword ? 'open' : 'closed'}
              variants={iconVariants}
              whileTap={{ scale: 0.8 }}
            >
              {
                <Icon
                  name={showPassword ? 'view' : 'eye-closed'}
                  className='size-5 text-default-500'
                />
              }
            </motion.div>
          }
        />
        <Input
          label='Confirme sua senha'
          type={showConfirmPassowrd ? 'text' : 'password'}
          placeholder='Confirme sua senha'
          labelPlacement='outside'
          size='md'
          {...register('confirmPassword')}
          isInvalid={Boolean(errors.confirmPassword?.message)}
          errorMessage={errors.confirmPassword?.message}
          endContent={
            <motion.div
              className='cursor-pointer'
              onClick={toggleConfirmPassword}
              animate={showConfirmPassowrd ? 'open' : 'closed'}
              variants={iconVariants}
              whileTap={{ scale: 0.8 }}
            >
              {
                <Icon
                  name={showConfirmPassowrd ? 'view' : 'eye-closed'}
                  className='size-5 text-default-500'
                />
              }
            </motion.div>
          }
        />
        <div className='w-full flex flex-col justify-center items-center gap-3'>
          <Button color='primary' type='submit' size='md' className='font-black w-full'>
            Cadastrar-se
          </Button>
          <p className='text-sm pb-4'>
            Já possui uma conta?{' '}
            <Link href='/login' className='font-black'>
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
