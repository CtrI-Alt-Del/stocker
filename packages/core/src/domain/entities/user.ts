import type { UserDto } from '../../dtos'
import { ValidationError } from '../../errors'
import { Entity } from '../abstracts'

type UserRole = 'admin' | 'manager' | 'employee'

type UserProps = {
  role: UserRole
  email: string
  name: string
  password?: string
}

export class User extends Entity<UserProps> {
  static create(dto: UserDto): User {
    const role = dto.role

    if (!User.isUserRole(dto.role)) {
      throw new ValidationError(`${role} não é um tipo de usuário válido`)
    }

    return new User({ name: dto.name, email: dto.email, role: role as UserRole }, dto.id)
  }

  static isUserRole(userRole: string): userRole is UserRole {
    return ['admin', 'manager', 'employee'].includes(userRole)
  }

  get name(): string {
    return this.props.name
  }

  get role(): string {
    return this.props.role
  }

  get email(): string {
    return this.props.email
  }

  get password(): string | undefined {
    return this.props.password
  }
}
