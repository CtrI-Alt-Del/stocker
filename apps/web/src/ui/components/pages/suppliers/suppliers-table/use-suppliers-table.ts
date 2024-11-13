import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import type { Selection } from '@nextui-org/react'
import type { SupplierDto } from '@stocker/core/dtos'
import type { User } from '@stocker/core/entities'
import type { RefObject } from 'react'
import { useState } from 'react'

type useSuppliersTableProps = {
  suppliers: SupplierDto[]
  drawerRef: RefObject<DrawerRef>
  onUpdateSupplier?: VoidFunction
  onSuppliersSelectionChange?: (suppliersIds: string[]) => void
}
export function useSuppliersTable({
  suppliers,
  drawerRef,
  onUpdateSupplier,
  onSuppliersSelectionChange,
}: useSuppliersTableProps) {
  const [supplierBeingEditted, setSupplierBeingEditted] = useState<SupplierDto | null>(null)

  function handleEditSupplierButtonClick(supplier: SupplierDto) {
    setSupplierBeingEditted(supplier)
    drawerRef.current?.open()
  }
  function handleDrawerClose() {
    setSupplierBeingEditted(null)
  }
  function handleCancelEditting() {
    setSupplierBeingEditted(null)
    drawerRef.current?.close()
  }
  function handleUpdateSupplierFormSubmit() {
    setSupplierBeingEditted(null)
    drawerRef.current?.close()
    if (onUpdateSupplier) onUpdateSupplier()
  }
  function handleSelectionChange(selection: Selection) {
    if (!onSuppliersSelectionChange) return
    if (selection === 'all') {
      onSuppliersSelectionChange(suppliers.map((supplier) => supplier.id || ''))
    }
    onSuppliersSelectionChange(Array.from(selection) as string[])
  }
  return {
    supplierBeingEditted,
    handleCancelEditting,
    handleUpdateSupplierFormSubmit,
    handleEditSupplierButtonClick,
    handleSelectionChange,
    handleDrawerClose,
  }
}
