import { Expandable } from '@/ui/components/commons/expandable'
import { NavbarLink } from './navbar-link'
import {
  Navbar as NavbarRoot,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'

export const Navbar = () => {
  return (
    <NavbarRoot>
      <NavbarBrand>Stocker</NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <NavbarLink href='/' icon='dashboard' isActive={false}>
            Dashbord
          </NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <Expandable.Root>
            <Expandable.Item id='1' title='Accordion 1'>
              <NavbarContent>
                <NavbarItem>
                  <NavbarLink href='/' icon='stock' isActive={false}>
                    Estoques
                  </NavbarLink>
                </NavbarItem>
                <NavbarItem>
                  <NavbarLink href='/' icon='arrow-up-down' isActive={false}>
                    Lançamentos
                  </NavbarLink>
                </NavbarItem>
              </NavbarContent>
            </Expandable.Item>
            <Expandable.Item id='2' title='Accordion 2'>
              <NavbarContent>
                <NavbarItem>
                  <NavbarLink href='/' icon='stock' isActive={false}>
                    Estoques
                  </NavbarLink>
                </NavbarItem>
                <NavbarItem>
                  <NavbarLink href='/' icon='arrow-up-down' isActive={false}>
                    Lançamentos
                  </NavbarLink>
                </NavbarItem>
              </NavbarContent>
            </Expandable.Item>
          </Expandable.Root>
        </NavbarItem>
      </NavbarContent>
    </NavbarRoot>
  )
}
