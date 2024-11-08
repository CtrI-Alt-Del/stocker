import { redirect } from 'next/navigation'

import { COOKIES, ROUTES } from '@/constants'
import { ResetPasswordPage } from '@/ui/components/pages/reset-password'
import { getCookieAction } from '@/actions'

type PageProps = {
  params: {
    passwordResetToken: string
  }
}

const Page = async ({ params }: PageProps) => {
  const cookie = await getCookieAction(COOKIES.passwordResetToken.key)
  console.log(cookie)
  if (!cookie) return redirect(ROUTES.login)

  const [token, email] = cookie.split('|')

  if (!email || token !== params.passwordResetToken) {
    return redirect(ROUTES.login)
  }

  console.log(email)

  return <ResetPasswordPage email={email} />
}

export default Page
