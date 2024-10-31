import { Tab, Tabs } from '@nextui-org/react'

import { Dialog } from '@/ui/components/commons/dialog'
import { IconButton } from '@/ui/components/commons/icon-button'
import { NotificationCard } from './notification-card'

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
            <ul className='space-y-4 divide-y-2 min-h-80'>
              <li>
                <NotificationCard
                  id=''
                  href='/'
                  icon='product'
                  title='Produto muito dahora dahora demais'
                  createdAt={new Date()}
                  onRemove={() => {}}
                />
              </li>
              <li>
                <NotificationCard
                  id=''
                  href='/'
                  icon='product'
                  title='Produto muito dahora'
                  createdAt={new Date()}
                  onRemove={() => {}}
                />
              </li>
              <li>
                <NotificationCard
                  id=''
                  href='/'
                  icon='product'
                  title='Produto muito dahora'
                  createdAt={new Date()}
                  onRemove={() => {}}
                />
              </li>
            </ul>
          </Tab>
          <Tab key='expiration-date' title='Lotes perto da  data de validade'>
            <ul className='space-y-4 divide-y-2 min-h-80'>
              <li>
                <NotificationCard
                  id=''
                  href='/'
                  icon='batch'
                  title='Lote muito dahora dahora demais'
                  createdAt={new Date()}
                  onRemove={() => {}}
                />
              </li>
            </ul>
          </Tab>
        </Tabs>
      )}
    </Dialog>
  )
}
