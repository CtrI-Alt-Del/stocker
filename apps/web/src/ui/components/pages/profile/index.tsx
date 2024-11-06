'use client'

import React, { useState } from 'react'
import { IconButton } from '../../commons/icon-button'
import { AdminLogoutButton } from './admin-logout-button'
import { DeleteAdminAccount } from './delete-admin-account-button'

export const ProfilePage = () => {
  const [habilitarEdicaoSenha, setHabilitarEdicaoSenha] = useState(true)
  const [habilitarEdicaoEmail, setHabilitarEdicaoEmail] = useState(true)
  return (
    <div className='flex flex-col items-center p-6 min-h-screen'>
      {/* Header */}
      <div className='flex flex-col w-full max-w-4xl space-y-4'>
        <h1 className='text-3xl font-black'>Painel do Administrador</h1>

        {/* Profile Section */}
        <div className=' p-6'>

          {/* Profile Information */}
          <div className='mt-6 space-y-4'>
            {/* Nome */}
            <div>
              <label className='block text-gray-700 font-semibold'>Nome</label>
              <input
                type='text'
                placeholder='Nome'
                className='w-full mt-1 p-2 border border-gray-300 rounded-md'
              />
            </div>

            {/* Nome da Empresa */}
            <div>
              <label className='block text-gray-700 font-semibold'>Nome da empresa</label>
              <input
                type='text'
                placeholder='Nome da Empresa'
                className='w-full mt-1 p-2 border border-gray-300 rounded-md'
              />
            </div>

            {/* CNPJ */}
            <div>
              <label className='block text-gray-700 font-semibold'>CNPJ</label>
              <input
                type='number'
                placeholder='CNPJ'
                disabled
                className='w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed'
              />
            </div>

            {/* Email */}
            <div>
              <label className='block text-gray-700 font-semibold'>Email</label>
              <div className='flex items-center space-x-2'>
                <input
                  type='email'
                  placeholder='Email'
                  disabled={habilitarEdicaoEmail} // Controla o estado de habilitação
                  className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${
                    habilitarEdicaoEmail
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : ''
                  }`}
                />
                <IconButton
                  name='pencil'
                  size={20}
                  onClick={() => setHabilitarEdicaoEmail(!habilitarEdicaoEmail)} // Inverte o estado ao clicar
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex mt-6 justify-between'>
          <div>
            <AdminLogoutButton />
            <DeleteAdminAccount />
          </div>
          <div>

          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
