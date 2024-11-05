import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants'
import { SERVER_ENV } from '@/constants/server-env'
import { cryptoProvider } from '@/providers'
import { RequestPasswordResetPage } from '@/ui/components/pages/request-reset'

const Page = () => {
  return <RequestPasswordResetPage />
}

export default Page
