import { Button, Input } from '@nextui-org/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Icon } from '@/ui/components/commons/icon'
import { useLoginAdminForm } from './use-login-admin-form'

export const LoginAdminForm = () => {
  const { getValues, control, handleSubmit, reset, errors } = useLoginAdminForm(
    () => { },
  )
  const [showPassword, setShowPassword] = useState<Boolean>(false)
  const iconVariants = {
    open: { scale: 1.1, transition: { duration: 0.3, type: 'spring' } },
    closed: { scale: 0.9,  transition: { duration: 0.3, type: 'spring' } },
  }
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='flex items-center justify-center flex-col flex-1  gap-5 p-6 '>
      <h1 className='text-3xl font-bold w-full text-center'>Login</h1>
      <form onSubmit={handleSubmit} className='grid grid-rows-2 gap-5 w-full max-w-md'>
        <Input
          label='Email'
          placeholder='Digite seu email'
          labelPlacement='outside'
          size='md'
        //   {...getValues('adminEmail')}
          isInvalid={Boolean(errors.adminEmail)}
          errorMessage={errors.adminEmail?.message}
        />

        <Input
          label='Senha'
          type={showPassword ? 'text' : 'password'}
          placeholder='Digite sua senha'
          labelPlacement='outside'
          size='md'
        //   {...getValues('password')}
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
        <p className='text-xs pb-4 justify-items-end'>
            Esqueceu sua senha?{' '}
            <Link href='/#' className='font-black'>
              Clique aqui!
            </Link>
          </p>
        <div className='w-full flex flex-col justify-center items-center gap-3'>
          <Button color='primary' type='submit' size='md' className='font-black w-full'>
            Entrar
          </Button>
          <p className='text-xs pb-4'>
            Não possui uma conta?{' '}
            <Link href='/register' className='font-black'>
              Cadastre-se agora!
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
