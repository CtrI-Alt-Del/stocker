import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import { Style } from '../components/style'
import { Logo } from '../components/logo'
import { Footer } from '../components/footer'

type WelcomeEmployeeTemplateProps = {
  baseUrl: string
  employeeName: string
  companyName: string
}

export const WelcomeEmployeeTemplate = ({
  baseUrl,
  employeeName,
  companyName,
}: WelcomeEmployeeTemplateProps) => (
  <Style>
    <Html className='bg-white font-sans'>
      <Head />
      <Preview>Redefinição de Senha - Stocker</Preview>
      <Body className='bg-white font-sans'>
        <Container className='mx-auto my-0 py-5 px-0'>
          <Logo baseUrl={baseUrl} />
          <Text className='text-lg leading-7 mt-2'>
            Olá, {employeeName}
            <br />
            Sua conta na Stocker para a empresa {companyName} foi criado com sucesso! 🎉
          </Text>
          <Text className='text-lg'>
            No momento sua senha de acesso é <strong>stocker@123</strong>. Clique no botão
            abaixo para fazer login e redefinir sua senha.
          </Text>
          <Section className='text-center mt-4'>
            <Button
              className='bg-brand rounded-lg text-white text-lg w-full py-3   inline-block'
              href={`${baseUrl}/login`}
            >
              Fazer login
            </Button>
          </Section>
          <Text className='text-lg leading-7 mt-5'>
            Caso não tenha solicitado a criação da sua conta na Stocker apenas ignore esse
            e-mail.
          </Text>

          <Footer />
        </Container>
      </Body>
    </Html>
  </Style>
)

WelcomeEmployeeTemplate.PreviewProps = {
  baseUrl: 'http://localhost:3000',
} as WelcomeEmployeeTemplateProps

export default WelcomeEmployeeTemplate
