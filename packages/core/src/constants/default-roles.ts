import { Role } from '../domain/structs'

export const DEFAULT_ROLES = [
  Role.create('admin', ['all']),
  Role.create('manager', [
    'products-control',
    'categories-control',
    'csv-export',
    'locations-control',
    'notifications-control',
    'suppliers-control',
    'reports',
  ]),
  Role.create('employee', ['inventory-movements']),
]
