import { Drawer } from '../../commons/drawer'
import { Search } from '../../commons/search'
import { Button } from '../../commons/button'

export const CategoriesPage = () => {
  return (
    <div>
      <div className='flex-1 w-full max-w-96 space-y-2'>
        <h1 className='text-3xl font-black'>Produtos</h1>
        <Search />
      </div>

      <div className='flex items-center gap-1'>
        <Drawer
          trigger={
            <Button variant='solid' color='primary' radius='sm'>
              Adicionar produto
            </Button>
          }
        >
          {(closeDrawer) => (
            <RegisterProductForm
              onSubmit={async () => {
                await handleRegisterProductFormSubmit()
                closeDrawer()
              }}
              onCancel={closeDrawer}
            />
          )}
        </Drawer>
      </div>
    </div>
  )
}
