'use client'

import { Button } from '@nextui-org/react'

import { Drawer } from '../../commons/drawer'
import { Search } from '../../commons/search'
import { AlertDialog } from '../../commons/alert-dialog'
import { RegisterSupplierForm } from './register-supplier-form'
import { SuppliersTable } from './suppliers-table'
import { useSuppliersPage } from './use-suppliers-page'

export const SuppliersPage = () => {
  const {
    page,
    totalPages,
    suppliers,
    isDeleting,
    selectedSuppliersIds,
    isLoading,
    handleRegisterSupplierFormSubmit,
    handleUpdateSupplier,
    handleSuppliersSelectionChange,
    handlePageChange,
    handleDeleteSuppliersAlertDialogConfirm,
  } = useSuppliersPage()
  return (
    <>
      <div className='space-y-5'>
        <div className='flex flex-col gap-3 md:flex-row md:gap-0 justify-between'>
          <div className='flex-1 w-full max-w-96 space-y-2'>
            <h1 className='text-3xl font-black'>Fornecedores</h1>
            <Search value={''} onSearchChange={() => {}} />
          </div>
          <div className='flex items-center justify-center gap-1'>
            {selectedSuppliersIds.length > 0 && (
              <AlertDialog
                trigger={
                  <Button color='danger' isLoading={isDeleting}>
                    Deletar fornecedores
                  </Button>
                }
                onConfirm={handleDeleteSuppliersAlertDialogConfirm}
              >
                {selectedSuppliersIds.length <= 1
                  ? 'Voce tem certeza que deseja deletar esse fornecedor?'
                  : 'Voce tem certeza que deseja deletar esses fornecedores?'}
              </AlertDialog>
            )}
            <Drawer
              trigger={
                <Button variant='solid' color='primary' size='md' className='text-orange'>
                  <span className='text-white'>Adicionar Fornecedor</span>
                </Button>
              }
            >
              {(closeDrawer) => (
                <RegisterSupplierForm
                  onSubmit={async () => {
                    await handleRegisterSupplierFormSubmit()
                    closeDrawer()
                  }}
                  onCancel={closeDrawer}
                />
              )}
            </Drawer>
          </div>
        </div>
        <SuppliersTable
          page={page}
          isLoading={isLoading}
          totalPages={totalPages}
          suppliers={suppliers}
          selectedSuppliersIds={selectedSuppliersIds}
          onPageChange={handlePageChange}
          onUpdateSupplier={handleUpdateSupplier}
          onSuppliersSelectionChange={handleSuppliersSelectionChange}
        />
      </div>
    </>
  )
}
