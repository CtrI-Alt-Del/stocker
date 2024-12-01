import { ValidationError } from '../../errors'
import type { RoleName, RolePermission } from '../../types'

const ROLE_PERMISSIONS: string[] = [
  'inventory-movements',
  'products-control',
  'categories-control',
  'csv-export',
  'locations-control',
  'notifications-control',
  'suppliers-control',
  'reports',
  'all',
]

export class Role {
  readonly name: RoleName
  readonly permissions: RolePermission[]

  private constructor(name: RoleName, permissions: RolePermission[]) {
    this.name = name
    this.permissions = permissions
  }

  static create(name: string, permissions: string[]) {
    const roleName = name
    const rolePermissions = permissions

    if (!Role.isRoleName(roleName)) {
      throw new ValidationError(`${roleName} is not a valid role name`)
    }

    if (!Role.isRolePermissions(rolePermissions)) {
      throw new ValidationError(`${rolePermissions.join(', ')} are not valid role name`)
    }

    return new Role(roleName, rolePermissions)
  }

  static isRoleName(name: string): name is RoleName {
    return ['admin', 'manager', 'employee'].includes(name)
  }

  static isRolePermissions(permissions: string[]): permissions is RolePermission[] {
    for (const permission of permissions) {
      if (!ROLE_PERMISSIONS.includes(permission)) return false
    }

    return true
  }

  hasPermission(permission: RolePermission) {
    return this.permissions.includes('all') || this.permissions.includes(permission)
  }

  updatePermissions(permissions: string[]) {
    return Role.create(this.name, permissions)
  }
}
