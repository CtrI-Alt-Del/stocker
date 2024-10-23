import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'

export const SubscribeAdminForm = () => {
  return (
    <div className='flex items-center justify-center flex-col flex-1  gap-5 p-6 '>
      <h1 className='text-3xl font-bold w-full text-center'>Cadastre sua conta</h1>
      <div className='grid grid-rows-5 gap-5 w-full max-w-md'>
        <Input
          label='Nome'
          placeholder='Digite seu nome'
          labelPlacement='outside'
          size='md'
        />
        <Input
          label='Email'
          placeholder='Digite seu email'
          labelPlacement='outside'
          size='md'
        />
        <Input
          label='Razão Social'
          placeholder='Digite o nome da sua empresa'
          labelPlacement='outside'
          size='md'
        />
        <Input
          label='CNPJ'
          placeholder='Digite o CNPJ da sua empresa'
          labelPlacement='outside'
          size='md'
        />

        <Input
          label='Senha'
          placeholder='Digite sua senha'
          labelPlacement='outside'
          size='md'
        />
        <Input
          label='Confirme sua senha'
          placeholder='Confirme sua senha'
          labelPlacement='outside'
          size='md'
        />
        <div className='w-full flex flex-col justify-center items-center gap-3'>
          <Button color='primary' size='md' className='font-black w-full'>
            Cadastrar-se
          </Button>
          <p className='text-sm pb-4'>
            Já possui uma conta?{' '}
            <Link href='/login' className='font-black'>
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
