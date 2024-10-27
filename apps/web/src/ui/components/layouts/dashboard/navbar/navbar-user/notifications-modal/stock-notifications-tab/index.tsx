import { NotificationCard } from '../notification-card'

export const StockNotificationsTab = () => {
  return (
    <>
      <ul className='space-y-4 divide-y-2'>
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
    </>
  )
}
