import { Button, Pagination, Spinner } from '@nextui-org/react'
import { Icon } from '@/ui/components/commons/icon'
import { Select } from '@/ui/components/commons/select'
import { Dialog } from '../dialog'
import { useSupplierSelect } from './use-supplier-select'

type SupplierSelectProps = {
  defaultSupplierId?: string
  className?: string
  onSelectChange: (supplierId: string) => void
  mode?: "filter" | "select"
}
 
export const SupplierSelect = ({
  className,
  defaultSupplierId,
  onSelectChange,
  mode = "select",
}: SupplierSelectProps) => {
  const {
    suppliers,
    isFetching,
    page,
    totalPages,
    selectedSupplierName,
    handleSupplierIdChange,
    handleSupplierPageChange,
  } = useSupplierSelect(onSelectChange, defaultSupplierId)

  return isFetching ? (
    <Spinner label='Carregando...' className='w-full h-full mx-auto' />
  ) : (
    <div className='space-y-2'>
      <Dialog
        title='Selecione um fornecedor'
        size='2xl'
        trigger={
          <Select className={className}>
            {selectedSupplierName || 'Selecione fornecedor'}
          </Select>
        }
      >
        {(closeDrawer) =>
          suppliers.length === 0 ? (
            <p className='text-center text-bg-zinc-600 font-semibold my-12'>
              Nenhum fornecedor registrado.
            </p>
          ) : (
            <>
              <div className='space-y-4'>
                {suppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className='flex items-center justify-between p-4 border border-zinc-300 rounded-lg'
                  >
                    <span className='font-medium text-zinc-800'>{supplier.name}</span>
                    <Button
                      className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                      onClick={() => {
                        handleSupplierIdChange(supplier.id)
                        closeDrawer()
                      }}
                    >
                      <Icon name='plus' size={18} />
                    </Button>
                  </div>
                ))}
              </div>
              {totalPages !== 1 && (
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={handleSupplierPageChange}
                  showControls
                />
              )}
            </>
          )
        }
      </Dialog>
    </div>
  )
}
