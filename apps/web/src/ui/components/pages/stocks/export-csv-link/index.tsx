import { Button, Link } from '@nextui-org/react'

import { Icon } from '@/ui/components/commons/icon'

type ExportCsvLinkProps = {
  href: string
}

export const ExportCsvLink = ({ href }: ExportCsvLinkProps) => {
  return (
    <Button
      as={Link}
      color='primary'
      radius='md'
      href={href}
      endContent={<Icon name='download' size={20} />}
    >
      Exportar CSV
    </Button>
  )
}
