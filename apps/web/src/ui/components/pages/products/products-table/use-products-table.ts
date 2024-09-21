import { type RefObject, useState } from 'react'
import type { Selection } from '@nextui-org/react'

import type { ProductDto } from '@stocker/core/dtos'

import type { DrawerRef } from '@/ui/components/commons/drawer/types'

export const useProductsTable = (
  drawerRef: RefObject<DrawerRef>,
  onUpdateProduct: VoidFunction,
) => {
  const [productBeingEditting, setProductBeingEditting] = useState<ProductDto | null>(
    null,
  )

  function handleEditProductButtonClick(productDto: ProductDto) {
    setProductBeingEditting(productDto)
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
    onUpdateProduct()
  }

  function handleSelectionChange(selection: Selection) {
    console.log(Array.from(selection))
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
