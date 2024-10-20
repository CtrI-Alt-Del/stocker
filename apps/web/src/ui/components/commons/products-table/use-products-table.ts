import { type RefObject, useState } from 'react'
import type { Selection } from '@nextui-org/react'

import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import type { Product } from '@stocker/core/entities'

type UseProductsTableProps = {
  products: Product[]
  drawerRef: RefObject<DrawerRef>
  onUpdateProduct?: VoidFunction
  onProductsSelectionChange?: (productsIds: string[]) => void
}

export const useProductsTable = ({
  products,
  drawerRef,
  onUpdateProduct,
  onProductsSelectionChange,
}: UseProductsTableProps) => {
  const [productBeingEditting, setProductBeingEditting] = useState<Product | null>(null)

  function handleEditProductButtonClick(product: Product) {
    setProductBeingEditting(product)
    drawerRef.current?.open()
  }

  function handleDrawerClose() {
    setProductBeingEditting(null)
  }

  function handleCancelEditting() {
    setProductBeingEditting(null)
    drawerRef.current?.close()
  }

  function handleUpdateProductFormSubmit() {
    setProductBeingEditting(null)
    drawerRef.current?.close()
    if (onUpdateProduct) onUpdateProduct()
  }

  function handleSelectionChange(selection: Selection) {
    if (!onProductsSelectionChange) return

    if (selection === 'all') {
      onProductsSelectionChange(products.map((product) => product.id))
    }

    onProductsSelectionChange(Array.from(selection) as string[])
  }

  return {
    productBeingEditting,
    handleCancelEditting,
    handleUpdateProductFormSubmit,
    handleEditProductButtonClick,
    handleSelectionChange,
    handleDrawerClose,
  }
}
