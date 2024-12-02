import { verifyRolePermissionAction } from '@/actions'
import { InventoryMovementsPage } from '@/ui/components/pages/inventory-movements'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyRolePermissionAction('reports')
  if (!isValidRole) {
    return notFound()
  }

  return <InventoryMovementsPage />
}

export default Page
