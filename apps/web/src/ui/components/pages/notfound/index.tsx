'use client'

import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'

export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <Image 
            src="/images/camel-not-found.png" 
            alt="Logo" 
            width={128} 
            height={128} 
            className="w-auto h-32 mb-4" 
          />
          <h1 className="text-6xl font-bold">Página não encontrada</h1>
          <p className="mt-5 text-xl">Desculpe, a página que você está procurando não foi encontrada.</p>
          <Link href="/" passHref>
            <Button
              className="mt-5 px-6 py-2 bg-primary text-white rounded"
            >
              Voltar à página inicial
            </Button>
          </Link>
        </div>
      )
}
