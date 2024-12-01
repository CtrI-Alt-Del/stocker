import { notFound } from 'next/navigation'

import { verifyRolePermissionAction } from '@/actions'
import { ProductsPage } from '@/ui/components/pages/products'

const Page = async () => {
  const isValidRole = await verifyRolePermissionAction('products-control')
  if (!isValidRole) {
    return notFound()
  }

  return <ProductsPage />
}

export default Page
