export type CategoryDto = {
  id?: string
  name: string
  parentCategoryId?: string
  companyId: string
  subCategories: CategoryDto[]
}
