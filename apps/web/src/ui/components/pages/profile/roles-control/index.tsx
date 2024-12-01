'use client'

import { Button, Divider, Spinner, Switch } from '@nextui-org/react'
import { useRolesControl } from './use-roles-control'
import type { RolePermission } from '@stocker/core/types'
import { Role } from '@stocker/core/structs'

const ROLE_PERMISSIONS: Record<string, string> = {
  'inventory-movements': 'Movimentações de estoque',
  'products-control': 'Controle de produtos',
  'categories-control': 'Controle de categorias',
  'csv-export': 'Exportação para CSV',
  'locations-control': 'Controle de locais',
  'notifications-control': 'Controle de notificações',
  'suppliers-control': 'Controle de fornecedores',
  reports: 'Relatórios',
}

type RolesControlProps = {
  roles: Array<{ name: string; permissions: string[] }>
  companyId: string
}

export const RolesControl = ({ roles, companyId }: RolesControlProps) => {
  const defualtManagerRole = roles.find((role) => role.name === 'manager')
  const defualtEmployeeRole = roles.find((role) => role.name === 'employee')
  const {
    managerRole,
    employeeRole,
    handleManagerPermissionChange,
    handleEmployeePermissionChange,
  } = useRolesControl(
    defualtManagerRole
      ? Role.create(defualtManagerRole?.name, defualtManagerRole.permissions)
      : null,
    defualtEmployeeRole
      ? Role.create(defualtEmployeeRole?.name, defualtEmployeeRole.permissions)
      : null,
    companyId,
  )

  return (
    <div>
      <h2 className='text-2xl text-zinc-800 font-bold'>Controle de permissões</h2>
      <h3 className='text-xl text-zinc-800 mt-3 font-medium'>Gerente</h3>
      <Divider className='mt-3' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 mt-3'>
        {Object.keys(ROLE_PERMISSIONS).map((permission) => (
          <Switch
            key={permission}
            name={permission}
            value={permission}
            isSelected={managerRole?.hasPermission(permission as RolePermission)}
            onChange={(event) =>
              handleManagerPermissionChange(event.target.value as RolePermission)
            }
          >
            <span className='text-sm'>{ROLE_PERMISSIONS[permission]}</span>
          </Switch>
        ))}
      </div>
      <h3 className='text-xl text-zinc-800 mt-6 font-medium'>Funcionário</h3>
      <Divider className='mt-3' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 mt-3'>
        {Object.keys(ROLE_PERMISSIONS).map((permission) => (
          <Switch
            key={permission}
            name={permission}
            value={permission}
            isSelected={employeeRole?.hasPermission(permission as RolePermission)}
            onChange={(event) =>
              handleEmployeePermissionChange(event.target.value as RolePermission)
            }
          >
            <span className='text-sm'>{ROLE_PERMISSIONS[permission]}</span>
          </Switch>
        ))}
      </div>
    </div>
  )
}
