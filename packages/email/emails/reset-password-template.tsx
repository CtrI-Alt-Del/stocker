import * as React from 'react'
import { Button, Container, Section, Text } from '@react-email/components'
import { Logo } from '../components/logo'
import { Footer } from '../components/footer'
import { Root } from '../components/root'

type ResetPasswordTemplateProps = {
  baseUrl: string
  token: string
  recipientEmail: string
}

export const ResetPasswordTemplate = ({
  baseUrl,
  recipientEmail,
  token,
}: ResetPasswordTemplateProps) => (
  <Root preview='Pedido de redefinição de senha'>
    <Container className='mx-auto my-0 py-5 px-0'>
      <Logo />
      <Text className='text-lg leading-7 mt-2'>
        Olá,
        <br />
        Recebemos um pedido para redefinir a senha da sua conta Stocker. Se você fez essa
        solicitação, clique no botão abaixo para criar uma nova senha.
      </Text>
      <Section className='text-center mt-4'>
        <Button
          className='bg-brand rounded-lg text-white text-lg w-full py-3   inline-block'
          href={`${baseUrl}/reset-password/${token}`}
        >
          Redefinir Senha
        </Button>
      </Section>
      <Text className='text-lg leading-7 mt-5'>
        Caso não tenha solicitado a redefinição, recomendamos que você melhore sua
        segurança e verifique suas informações.
      </Text>

      <Footer />
    </Container>
  </Root>
)

ResetPasswordTemplate.PreviewProps = {
  baseUrl: 'http://localhost:3000',
} as ResetPasswordTemplateProps

export default ResetPasswordTemplate
