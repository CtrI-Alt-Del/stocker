import { Dialog } from '@/ui/components/commons/dialog'
import { Tab, Tabs } from '@nextui-org/react'
import { StockNotificationsTab } from './stock-notifications-tab'
import { IconButton } from '@/ui/components/commons/icon-button'

export const NotifcationsDialog = () => {
  return (
    <Dialog
      size='lg'
      title='Notificações'
      trigger={<IconButton name='notification' tag='3' size={16} />}
    >
      {() => (
        <Tabs
          variant='underlined'
          aria-label='Categorias de notificação'
          className='w-full bg-transparent'
        >
          <Tab key='stock' title='Produtos com estoque zero'>
            <StockNotificationsTab />
          </Tab>
          <Tab key='expiration-date' title='Lotes fora da data de validade'>
            <StockNotificationsTab />
          </Tab>
        </Tabs>
      )}
    </Dialog>
  )
}
