import * as React from 'react'
import { Hr, Text } from '@react-email/components'

export const Footer = () => (
  <>
    <Text className='text-lg leading-7 mt-5'>
      Atenciosamente, <br />
      <strong>Equipe Stocker</strong>
    </Text>

    <Hr className='border-gray-300 my-5' />
    <Text className='text-xs text-gray-500'>
      Parque de Inovação Tecnológica, São José dos Campos, São Paulo
    </Text>
  </>
)
