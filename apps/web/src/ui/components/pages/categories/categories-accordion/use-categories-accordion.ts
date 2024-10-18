import { DrawerRef } from '@/ui/components/commons/drawer/types'

import { CategoryDto } from '@stocker/core/dtos'
import { Category } from '@stocker/core/entities'
import { RefObject, useState } from 'react'
type useCategoriesAccordionProps = {
  categories: CategoryDto[]
  drawerRef: RefObject<DrawerRef>
  registerDrawerRef: RefObject<DrawerRef>
  onUpdateCategory: VoidFunction
  onRegisterSubCategory: VoidFunction
}
export function useCategoriesAccordion({
  onRegisterSubCategory,
  registerDrawerRef,
  categories,
  drawerRef,
  onUpdateCategory,
}: useCategoriesAccordionProps) {
  const [categoryBeingEditted, setCategoryBeingEditted] = useState<null | CategoryDto>(
    null,
  )
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null)
  function handleEditCategoryButtonClick(category: CategoryDto) {
    setCategoryBeingEditted(category)
    drawerRef.current?.open()
  }
  function handleRegisterSubCategoryButtonClick(parentCategoryId: string) {
    setParentCategoryId(parentCategoryId)
    registerDrawerRef.current?.open()
  }
  function handleDrawerClose() {
    setParentCategoryId(null)
    setCategoryBeingEditted(null)
  }
  function handleCancelEditting() {
    setCategoryBeingEditted(null)
    setParentCategoryId(null)
    drawerRef.current?.close()
    registerDrawerRef.current?.close()
  }
  function handleUpdateCategoryFormSubmit() {
    setCategoryBeingEditted(null)
    drawerRef.current?.close()
    onUpdateCategory()
  }
  function handleRegisterSubCategoryFormSubmit(){
    setParentCategoryId(null)
    registerDrawerRef.current?.close()
    onRegisterSubCategory()
  }
  return {
    parentCategoryId,
    handleRegisterSubCategoryButtonClick,
    handleRegisterSubCategoryFormSubmit,
    categoryBeingEditted,
    handleCancelEditting,
    handleUpdateCategoryFormSubmit,
    handleEditCategoryButtonClick,
    handleDrawerClose,
  }
}
