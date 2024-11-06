'use client'

import { NavbarLink } from './navbar-link'
import {
  AccordionItem,
  Accordion,
  Navbar as NavbarRoot,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'

import { Icon } from '@/ui/components/commons/icon'
import { useNavigation } from '@/ui/hooks'
import { ROUTES } from '@/constants'
import { Logo } from '@/ui/components/commons/logo'
import { NavbarUser } from './navbar-user'

export const Navbar = () => {
  const { currentRoute } = useNavigation()

  return (
    <NavbarRoot
      classNames={{
        base: 'relative block h-full bg-white md:bg-transparent',
        wrapper: 'block h-full p-0',
      }}
    >
      <NavbarBrand className='p-0'>
        <Logo />
      </NavbarBrand>
      <NavbarContent className='flex-col gap-0 mt-6 p-0 w-full'>
        <NavbarItem className='w-full'>
          <NavbarLink
            href={ROUTES.dashboard}
            icon='dashboard'
            isActive={currentRoute === ROUTES.dashboard}
          >
            Dashboard
          </NavbarLink>
        </NavbarItem>
        <NavbarItem className='w-full mt-3'>
          <Accordion showDivider={false} className='p-0 space-y-3'>
            <AccordionItem
              key='1'
              startContent={<Icon name='inventory' size={16} />}
              title='Inventário'
              aria-label='Inventário'
              classNames={{
                base: 'font-medium text-zinc-500 w-full data-[open=true]:text-zinc-900',
                title:
                  'font-normal text-medium text-zinc-500 font-medium data-[open=true]:text-zinc-900',
                indicator: 'text-medium text-zinc-500 data-[open=true]:text-zinc-900',
                trigger: 'rounded-md p-2 data-[open=true]:bg-zinc-200/50',
              }}
            >
              <NavbarContent className='flex-col gap-0 border-l border-zinc-300 pl-2'>
                <NavbarItem className='w-full'>
                  <NavbarLink
                    href={ROUTES.inventory.stocks}
                    icon='stock'
                    isActive={currentRoute === '/inventory/stocks'}
                  >
                    Estoques
                  </NavbarLink>
                </NavbarItem>
                <NavbarItem className='w-full'>
                  <NavbarLink
                    href={ROUTES.inventory.movements}
                    icon='arrow-up-down'
                    isActive={currentRoute === '/inventory/movements'}
                  >
                    Lançamentos
                  </NavbarLink>
                </NavbarItem>
              </NavbarContent>
            </AccordionItem>
            <AccordionItem
              key='2'
              startContent={<Icon name='record' size={20} />}
              title='Cadastros'
              aria-label='Cadastros'
              classNames={{
                base: 'font-medium text-zinc-500 data-[open=true]:text-zinc-900',
                title:
                  'font-normal text-medium text-zinc-500 font-medium data-[open=true]:text-zinc-900',
                indicator: 'text-medium text-zinc-500 data-[open=true]:text-zinc-900',
                trigger: 'rounded-md p-2 data-[open=true]:bg-zinc-200/50',
              }}
            >
              <NavbarContent className='flex-col gap-1 border-l border-zinc-300 pl-2'>
                <NavbarItem className='w-full'>
                  <NavbarLink
                    href={ROUTES.records.products}
                    icon='product'
                    isActive={currentRoute === ROUTES.records.products}
                  >
                    Produtos
                  </NavbarLink>
                </NavbarItem>
                <NavbarItem className='w-full'>
                  <NavbarLink
                    href={ROUTES.records.employees}
                    icon='employee'
                    isActive={currentRoute === ROUTES.records.employees}
                  >
                    Funcionários
                  </NavbarLink>
                </NavbarItem>
                <NavbarItem className='w-full'>
                  <NavbarLink
                    href={ROUTES.records.suppliers}
                    icon='supplier'
                    isActive={currentRoute === ROUTES.records.suppliers}
                  >
                    Fornecedores
                  </NavbarLink>
                </NavbarItem>
                <NavbarItem className='w-full'>
                  <NavbarLink
                    href={ROUTES.records.categories}
                    icon='category'
                    isActive={currentRoute === ROUTES.records.categories}
                  >
                    Categorias
                  </NavbarLink>
                </NavbarItem>
                <NavbarItem className='w-full'>
                  <NavbarLink
                    href={ROUTES.records.locations}
                    icon='location'
                    isActive={currentRoute === ROUTES.records.locations}
                  >
                    Setores
                  </NavbarLink>
                </NavbarItem>
              </NavbarContent>
            </AccordionItem>
          </Accordion>
        </NavbarItem>

        <NavbarItem className='absolute bottom-0 w-full'>
          <NavbarUser />
        </NavbarItem>
      </NavbarContent>
    </NavbarRoot>
  )
}
