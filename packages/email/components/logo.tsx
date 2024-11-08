import * as React from 'react'
import { Img } from '@react-email/components'

type ResetPasswordTemplateProps = {
  baseUrl: string
}

export const Logo = ({ baseUrl }: ResetPasswordTemplateProps) => (
  // @ts-ignore
  <Img
    src={`${baseUrl}/images/camel.png`}
    width='100'
    height='80'
    alt='Camela negro carregando dois containers laranjas em suas costas'
    className='mx-auto'
  />
)
