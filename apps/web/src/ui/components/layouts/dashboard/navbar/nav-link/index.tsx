import { Button, Link } from '@nextui-org/react'

import type { IconName } from '@/ui/components/commons/icon/types'
import { Icon } from '@/ui/components/commons/icon'
import { twMerge } from 'tailwind-merge'

type NavLinkProps = {
  href: string
  icon: IconName
  isActive: boolean
  children: string
}

export const NavLink = ({ icon, href, isActive, children: title }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex items-center gap-2 text-zinc-800 rounded-md p-6 font-medium',
        isActive ? 'bg-zinc-800 text-zinc-50' : 'bg-transparent text-zinc-600',
      )}
    >
      <Icon name={icon} />
      {title}
    </Link>
  )
}
