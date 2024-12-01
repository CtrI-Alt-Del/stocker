import type { RolePermission } from '@stocker/core/types'
import type { RolePermissionName } from '@prisma/client'
import type { PrismaRole } from '../types'
import { Role } from '@stocker/core/structs'
import { prisma } from '../prisma-client'

export class PrismaRoleMapper {
  toDomain(prismaRole: PrismaRole): Role {
    const prismaRolePermissions: Record<RolePermissionName, RolePermission> = {
      INVENTORY_MOVEMENTS: 'inventory-movements',
      PRODUCTS_CONTROL: 'products-control',
      CATEGORIES_CONTROL: 'categories-control',
      CSV_EXPORT: 'csv-export',
      LOCATIONS_CONTROL: 'locations-control',
      NOTIFICATIONS_CONTROL: 'notifications-control',
      SUPPLIERS_CONTROL: 'suppliers-control',
      REPORTS: 'reports',
      ALL: 'all',
    }

    const role = {
      name: prismaRole.name,
      permissions: prismaRole.permissions.map(
        (permission) => prismaRolePermissions[permission.name],
      ),
    }

    return Role.create(role.name, role.permissions)
  }

  async toPrisma(role: Role): Promise<PrismaRole> {
    const prismaRolePermissions: Record<RolePermission, RolePermissionName> = {
      'inventory-movements': 'INVENTORY_MOVEMENTS',
      'products-control': 'PRODUCTS_CONTROL',
      'categories-control': 'CATEGORIES_CONTROL',
      'csv-export': 'CSV_EXPORT',
      'locations-control': 'LOCATIONS_CONTROL',
      'notifications-control': 'NOTIFICATIONS_CONTROL',
      'suppliers-control': 'SUPPLIERS_CONTROL',
      reports: 'REPORTS',
      all: 'ALL',
    }

    const prismaRole = await prisma.role.findUnique({ where: { name: role.name } })

    if (!prismaRole) throw new Error()

    return {
      id: prismaRole?.id,
      name: role.name,
      permissions: role.permissions.map((permission) => ({
        id: '',
        company_id: '',
        role_id: '',
        name: prismaRolePermissions[permission],
      })),
    }
  }
}
