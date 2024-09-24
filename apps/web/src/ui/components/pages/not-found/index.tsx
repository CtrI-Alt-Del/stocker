"use client"
import {Image} from "@nextui-org/react";

const Error404 = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex-1 max-w-96 space-y-2'>
        <h3>Voltar</h3>
      </div>
      <div>
        <div>
          <h1>404</h1>
          <p>EIta Página não encontrada</p>
        </div>
        <Image
      width={300}
      alt="NextUI hero Image"
      src="/documentation/images/logo-error.png"
    />
      </div>
    </div>
  )
}

export default Error404
