'use client'

import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import Image from 'next/image'

export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <Image 
            src="/images/camel-not-found.png" 
            alt="Sleeping Camel" 
            width={300}
            height={300} 
            className="w-auto h-62" 
          />
          <h1 className="text-6xl font-bold">Página não encontrada!</h1>
          <p className="mt-5 text-xl">Desculpe, a página que você está procurando não foi encontrada.</p>
          <Button className="px-6 py-2 mt-5 text-white rounded bg-primary" as={Link} href="/records/products">
            Voltar para a página inicial
          </Button>
        </div>
      )
}
