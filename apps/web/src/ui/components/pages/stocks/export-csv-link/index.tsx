import { Button, Link } from '@nextui-org/react'

import { ROUTES } from '@/constants'
import { BROWSER_ENV } from '@/constants/browser-env'
import { Icon } from '@/ui/components/commons/icon'

export const ExportCsvLink = () => {
  return (
    <Button
      as={Link}
      color='primary'
      radius='md'
      href={`${BROWSER_ENV.appUrl}${ROUTES.api.inventoryCsv}`}
      endContent={<Icon name='download' size={20} />}
    >
      Exportar CSV
    </Button>
  )
}
