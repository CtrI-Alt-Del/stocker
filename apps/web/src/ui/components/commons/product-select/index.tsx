import { Dialog } from '../dialog'
import { useProductSelect } from './use-product-select'
import { ProductsTable } from '../products-table'
import { Select } from '../select'

type ProductSelectProps = {
  productId: string
  onSelectChange: (productId: string) => void
}

export const ProductSelect = ({ productId, onSelectChange }: ProductSelectProps) => {
  const {
    productName,
    page,
    products,
    totalPages,
    isFetching,
    handlePageChange,
    handleProductIdChange,
  } = useProductSelect(productId, onSelectChange)

  return (
    <Dialog
      size='5xl'
      title='Selecione o produto'
      trigger={
        <Select className='h-10 w-48'>
          {productName ? productName : 'Selecione o produto'}
        </Select>
      }
    >
      {(closeDialog) => (
        <ProductsTable
          selectionMode='single'
          page={page}
          products={products}
          totalPages={totalPages}
          isLoading={isFetching}
          onPageChange={handlePageChange}
          onProductsSelectionChange={(productsIds) => {
            closeDialog()
            handleProductIdChange(productsIds)
          }}
          selectedProductsIds={[productId]}
        />
      )}
    </Dialog>
  )
}
