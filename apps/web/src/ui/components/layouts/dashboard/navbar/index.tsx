import { Expandable } from '@/ui/components/commons/expandable'
import { NavLink } from './nav-link'

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink href='/' icon='dashboard' isActive={false}>
            Dashbord
          </NavLink>
        </li>
        <li>
          <Expandable.Root>
            <Expandable.Item id='1' title='Accordion 1'>
              <ul>
                <li>
                  <NavLink href='/' icon='stock' isActive={false}>
                    Estoques
                  </NavLink>
                </li>
                <li>
                  <NavLink href='/' icon='arrow-up-down' isActive={false}>
                    Lançamentos
                  </NavLink>
                </li>
              </ul>
            </Expandable.Item>
            <Expandable.Item id='1' title='Accordion 1'>
              <ul>
                <li>
                  <NavLink href='/' icon='stock' isActive={false}>
                    Estoques
                  </NavLink>
                </li>
                <li>
                  <NavLink href='/' icon='arrow-up-down' isActive={false}>
                    Lançamentos
                  </NavLink>
                </li>
              </ul>
            </Expandable.Item>
          </Expandable.Root>
        </li>
      </ul>
    </nav>
  )
}
