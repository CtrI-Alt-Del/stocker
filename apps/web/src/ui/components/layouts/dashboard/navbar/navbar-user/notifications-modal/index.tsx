import { Tab, Tabs } from '@nextui-org/react'

import { Dialog } from '@/ui/components/commons/dialog'
import { IconButton } from '@/ui/components/commons/icon-button'
import { NotificationCard } from './notification-card'
import { useNotificationModal } from './use-notification-modal'
import { ExpirationDateNotification } from '@stocker/core/entities'

export const NotifcationsDialog = () => {
  const { expirationDateNotifications, stockNotifications, totalNotifications } =
    useNotificationModal()
  return (
    <Dialog
      size='lg'
      title='Notificações'
      trigger={
        <IconButton
          name='notification'
          tag={totalNotifications ? totalNotifications.toString() : undefined}
          size={16}
        />
      }
    >
      {() => (
        <Tabs
          variant='underlined'
          aria-label='Categorias de notificação'
          className='w-full bg-transparent'
        >
          <Tab key='stock' title='Produtos com estoque zero'>
            <ul className='space-y-4 divide-y-2 min-h-80'>
              {stockNotifications.map((stockNotification) => (
                <li key={stockNotification.id}>
                  <NotificationCard
                    id={stockNotification.id || ''}
                    href={`/inventory/stocks/${stockNotification.product.id}`}
                    icon='product'
                    title={stockNotification.product.name}
                    createdAt={stockNotification.createdAt}
                    onRemove={() => { }}
                  />
                </li>
              ))}
            </ul>
          </Tab>
          <Tab key='expiration-date' title='Lotes perto da  data de validade'>
            <ul className='space-y-4 divide-y-2 min-h-80'>
              {expirationDateNotifications.map((expirationDateNotification) => (
                <li key={expirationDateNotification.id}>
                  <NotificationCard
                    id={expirationDateNotification.id || ''}
                    href={`/inventory/stocks/${expirationDateNotification.id}`}
                    icon='batch'
                    title={expirationDateNotification.batch.code}
                    createdAt={expirationDateNotification.createdAt}
                    onRemove={() => { }}
                  />
                </li>
              ))}
            </ul>
          </Tab>
        </Tabs>
      )}
    </Dialog>
  )
}
