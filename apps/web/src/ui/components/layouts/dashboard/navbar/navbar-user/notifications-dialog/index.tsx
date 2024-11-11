import { Tab, Tabs } from '@nextui-org/react'

import { Dialog } from '@/ui/components/commons/dialog'
import { IconButton } from '@/ui/components/commons/icon-button'
import { NotificationCard } from './notification-card'
import { useNotificationDialog } from './use-notifications-dialog'
import { Tag } from '@/ui/components/commons/tag'

type NotifcationsDialogProps = {
  companyId: string
}

export const NotifcationsDialog = ({ companyId }: NotifcationsDialogProps) => {
  const {
    expirationDateNotifications,
    stockLevelNotifications,
    notificationsCount,
    handleDeleteNotification,
  } = useNotificationDialog(companyId)

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
          <Tab
            key='stock'
            title={
              <div className='relative'>
                <p>Produtos com baixo estoque</p>
                {stockLevelNotifications.length > 0 && (
                  <Tag type='danger' size='sm' className='absolute -top-2 -right-5 z-50'>
                    {stockLevelNotifications.length.toString()}
                  </Tag>
                )}
              </div>
            }
            className='overflow-visible'
          >
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
                        onDelete={handleDeleteNotification}
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
          <Tab
            key='expiration-date'
            title={
              <div className='relative'>
                <p>Lotes próximos da expiração</p>
                {expirationDateNotifications.length > 0 && (
                  <Tag type='danger' size='sm' className='absolute -top-2 -right-4 z-50'>
                    {expirationDateNotifications.length.toString()}
                  </Tag>
                )}
              </div>
            }
          >
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
                        onDelete={handleDeleteNotification}
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
