import { ResetPasswordPage } from '@/ui/components/pages/reset-password'

type PageProps = {
  params: {
    passwordResetToken: string
  }
}

const Page = ({ params }: PageProps) => {
  // const isValidToken = cryptoProvider.validateHash(
  //   SERVER_ENV.passwordResetSecret,
  //   params.passwordResetToken,
  // )

  // if (!isValidToken) {
  //   return redirect(ROUTES.login)
  // }

  return <ResetPasswordPage />
}

export default Page
