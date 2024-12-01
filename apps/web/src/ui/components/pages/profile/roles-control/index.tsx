import { Switch } from '@nextui-org/react'
import { useRolesControl } from './use-roles-control'
import type { RolePermission } from '@stocker/core/types'

const ROLE_PERMISSIONS: Record<string, string> = {
  'inventory-movements': 'Movimentações de estoque',
  'products-control': 'Gerenciamento de produtos',
  'categories-control': 'Gerenciamento de categorias',
  'csv-export': 'Exportação para CSV',
  'locations-control': 'Gerenciamento de locais',
  'notifications-control': 'Gerenciamento de notificações',
  'suppliers-control': 'Gerenciamento de fornecedores',
  reports: 'Relatórios',
}

export const RolesControl = () => {
  const { roles, isFetching, handleManagerPermissionChange } = useRolesControl()

  return (
    <div>
      <h2 className='text-2xl text-zinc-800 font-bold'>Controle de permissões</h2>
      <h3 className='text-xl text-zinc-700 mt-3'>Gerente</h3>
      <form
        className='grid grid-cols-4'
        onSubmit={(event) => handleManagerPermissionChange(event, 'manager')}
      >
        {Object.keys(ROLE_PERMISSIONS).map((permission) => (
          <Switch
            key={permission}
            type='submit'
            name={permission}
            value={permission}
            isSelected={roles?.manager?.permissions.includes(
              permission as RolePermission,
            )}
          >
            Gerenciamento de produtos
          </Switch>
        ))}
      </form>
      <h3 className='text-xl text-zinc-700 mt-3'>Funcionário</h3>
      <div className='grid grid-cols-4'>
        {Object.keys(ROLE_PERMISSIONS).map((permission) => (
          <Switch
            key={permission}
            type='submit'
            name={permission}
            value={permission}
            isSelected={roles?.employee?.permissions.includes(
              permission as RolePermission,
            )}
          >
            Gerenciamento de produtos
          </Switch>
        ))}
      </div>
    </div>
  )
}
