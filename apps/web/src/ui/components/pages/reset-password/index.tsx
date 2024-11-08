import { ResetPasswordForm } from './reset-password-form'

type ResetPasswordPageProps = {
  email: string
}

export const ResetPasswordPage = async ({ email }: ResetPasswordPageProps) => {
  return <ResetPasswordForm email={email} />
}
