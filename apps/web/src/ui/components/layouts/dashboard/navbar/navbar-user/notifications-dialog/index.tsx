import { Tab, Tabs } from '@nextui-org/react'

import { Dialog } from '@/ui/components/commons/dialog'
import { IconButton } from '@/ui/components/commons/icon-button'
import { NotificationCard } from './notification-card'
import { useNotificationDialog } from './use-notifications-dialog'

type NotifcationsDialogProps = {
  companyId: string
}

export const NotifcationsDialog = ({ companyId }: NotifcationsDialogProps) => {
  const { expirationDateNotifications, stockLevelNotifications, notificationsCount } =
    useNotificationDialog(companyId)

  return (
    <Dialog
      size='lg'
      title='Notificações'
      trigger={
        <IconButton
          name='notification'
          tag={notificationsCount !== 0 ? notificationsCount.toString() : ''}
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
            <div className='h-80'>
              {stockLevelNotifications.length > 0 ? (
                <ul className='space-y-4 divide-y-2 pb-6'>
                  {stockLevelNotifications.map((stockNotification) => (
                    <li key={stockNotification.id}>
                      <NotificationCard
                        id={stockNotification.id}
                        href={`/inventory/stocks/${stockNotification.product.id}`}
                        icon='product'
                        title={`${stockNotification.product.name} | ${stockNotification.product.code}`}
                        sentAt={stockNotification.sentAt ?? new Date()}
                        onRemove={() => {}}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-center text-zinc-700 mt-2'>
                  Nenhuma notificação encontrada.
                </p>
              )}
            </div>
          </Tab>
          <Tab key='expiration-date' title='Lotes perto da  data de validade'>
            <div className='h-80'>
              {expirationDateNotifications.length > 0 ? (
                <ul className='space-y-4 divide-y-2 pb-6'>
                  {expirationDateNotifications.map((expirationDateNotification) => (
                    <li key={expirationDateNotification.id}>
                      <NotificationCard
                        id={expirationDateNotification.id}
                        href={`/inventory/stocks/${expirationDateNotification.id}`}
                        icon='batch'
                        title={expirationDateNotification.batch.code}
                        sentAt={expirationDateNotification.sentAt ?? new Date()}
                        onRemove={() => {}}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-center text-zinc-700 mt-2'>
                  Nenhuma notificação encontrada.
                </p>
              )}
            </div>
          </Tab>
        </Tabs>
      )}
    </Dialog>
  )
}
