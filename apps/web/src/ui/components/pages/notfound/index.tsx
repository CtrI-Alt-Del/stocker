'use client'

import { Button } from '@nextui-org/button'

export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <img src="/images/camel-not-found.png" alt="Logo" className="w-auto h-32 mb-4" />
    
          <h1 className="text-6xl font-bold">Página não encontrada</h1>
          <p className="mt-5 text-xl">Desculpe, a página que você está procurando não foi encontrada.</p>
          <button
            type="button"
            className="mt-5 px-6 py-2 bg-[#EF5C31] text-white rounded"
            onClick={() => window.location.href = '/'}>
            Voltar à página inicial
          </button>
        </div>
      )
}
