import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

type ResetPasswordTemplateProps = {
  baseUrl: string
}

const ResetPasswordTemplate = ({ baseUrl }: ResetPasswordTemplateProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: '#EF5C31',
          },
        },
      },
    }}
  >
    <Html className='bg-white font-sans'>
      <Head />
      <Preview>Redefinição de Senha - Stocker</Preview>
      <Body className='bg-white font-sans'>
        <Container className='mx-auto my-0 py-5 px-0'>
          <Text className='text-lg leading-7 mt-2'>
            Olá,
            <br />
            Recebemos um pedido para redefinir a senha da sua conta Stocker. Se você fez
            essa solicitação, clique no botão abaixo para criar uma nova senha.
          </Text>
          <Section className='text-center mt-4'>
            <Button
              className='bg-brand rounded-lg text-white text-lg w-full py-3   inline-block'
              href={`${baseUrl}`}
            >
              Redefinir Senha
            </Button>
          </Section>
          <Text className='text-lg leading-7 mt-5'>
            Caso não tenha solicitado a redefinição, recomendamos que você melhore sua
            segurança e verifique suas informações.
          </Text>
          <Text className='text-lg leading-7 mt-5'>
            Atenciosamente, <br />
            <strong>Equipe Stocker</strong>
          </Text>

          <Hr className='border-gray-300 my-5' />
          <Text className='text-xs text-gray-500'>
            Parque de Inovação Tecnológica, São José dos Campos, São Paulo
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

ResetPasswordTemplate.PreviewProps = {
  baseUrl: 'http://localhost:3000',
} as ResetPasswordTemplateProps

export default ResetPasswordTemplate
