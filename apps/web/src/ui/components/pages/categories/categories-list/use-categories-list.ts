import { type RefObject, useState } from 'react'

import type { Category } from '@stocker/core/entities'

import type { DrawerRef } from '@/ui/components/commons/drawer/types'

type useCategoriesAccordionProps = {
  categories: Category[]
  drawerRef: RefObject<DrawerRef>
  registerDrawerRef: RefObject<DrawerRef>
  onUpdateCategory: VoidFunction
  onRegisterSubCategory: VoidFunction
}
export function useCategoriesList({
  onRegisterSubCategory,
  registerDrawerRef,
  drawerRef,
  onUpdateCategory,
}: useCategoriesAccordionProps) {
  const [categoryBeingEditted, setCategoryBeingEditted] = useState<null | Category>(null)
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  function handleAccordionClick(id: string) {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  function handleEditCategoryButtonClick(category: Category) {
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

  function handleRegisterSubCategoryFormSubmit() {
    setParentCategoryId(null)
    registerDrawerRef.current?.close()
    onRegisterSubCategory()
  }

  return {
    parentCategoryId,
    categoryBeingEditted,
    expandedItems,
    handleAccordionClick,
    handleRegisterSubCategoryButtonClick,
    handleRegisterSubCategoryFormSubmit,
    handleCancelEditting,
    handleUpdateCategoryFormSubmit,
    handleEditCategoryButtonClick,
    handleDrawerClose,
  }
}
