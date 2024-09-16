import { Link } from '@nextui-org/react'

import type { IconName } from '@/ui/components/commons/icon/types'
import { Icon } from '@/ui/components/commons/icon'
import { twMerge } from 'tailwind-merge'

type NavLinkProps = {
  href: string
  icon: IconName
  isActive: boolean
  children: string
}

export const NavbarLink = ({ icon, href, isActive, children: title }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex items-center gap-2 text-zinc-200/50 rounded-md p-2 text-base font-medium',
        isActive ? 'bg-zinc-200/50 text-zinc-900' : 'bg-transparent text-zinc-500',
      )}
    >
      <Icon name={icon} size={16} />
      {title}
    </Link>
  )
}
