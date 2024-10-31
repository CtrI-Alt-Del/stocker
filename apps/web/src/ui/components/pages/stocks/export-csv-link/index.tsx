import { BROWSER_ENV } from '@/constants/browser-env'
import { Icon } from '@/ui/components/commons/icon'
import { Button, Link } from '@nextui-org/react'

export const ExportCsvLink = () => {
  return (
    <Button
      as={Link}
      color='primary'
      radius='md'
      href={`${BROWSER_ENV.serverUrl}/reports/inventory/csv`}
      endContent={<Icon name='download' />}
    >
      Exportar CSV
    </Button>
  )
}
