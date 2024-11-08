import { verifyUserRoleAction } from '@/actions'
import { CategoriesPage } from '@/ui/components/pages/categories'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyUserRoleAction('manager')
  if (!isValidRole) {
    return notFound()
  }
  return <CategoriesPage />
}

export default Page
