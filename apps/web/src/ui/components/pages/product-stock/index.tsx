'use client'
import { Button } from '@nextui-org/react'
import { Drawer } from '../../commons/drawer'
import { RegisterInboundMovementForm } from './inbound-movement'
import { useBreakpoint } from '@/ui/hooks'
import { useInventoryMovementPage } from '../inventory-movements/use-inventory-moviment'

export const ProductStockPage = () => {
  const { handleRegisterInventoryMovementFormSubmit, page, movements, totalPages, handlePageChange, isFetching } = useInventoryMovementPage("idMOck")
  const { md } = useBreakpoint()

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex justify-end flex-col'>
          <h1 className='text-2xl flex justify-end'>Banana</h1>
          <small className='uppercase text-xl text-zinc-400'>K04-59</small>
        </div>

        <div className='space-x-2'>
          <Drawer
            width={md ? 400 : 700}
            trigger={
              <Button variant='solid' color='primary' radius='sm'>
                Lançamento de entrada
              </Button>
            }
          >
            {(closeDrawer) => <RegisterInboundMovementForm onCancel={closeDrawer} onSubmit={async () => {
              await handleRegisterInventoryMovementFormSubmit()
              closeDrawer()
            }} />}
          </Drawer>

          <Button color='primary'>Lançamento de saída</Button>
        </div>
      </div>
    </div>
  )
}
