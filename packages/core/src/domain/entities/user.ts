import type { UserDto } from '../../dtos'
import { ValidationError } from '../../errors'
import type { UserRole } from '../../types'
import { Entity } from '../abstracts'

type UserProps = {
  role: UserRole
  email: string
  name: string
  password: string
  companyId: string
}

export class User extends Entity<UserProps> {
  static create(dto: UserDto): User {
    const role = dto.role

    if (!User.isUserRole(role)) {
      throw new ValidationError(`${role} não é um tipo de usuário válido`)
    }

    return new User(
      {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        companyId: dto.companyId,
        role: role,
      },
      dto.id,
    )
  }

  static isUserRole(userRole: string): userRole is UserRole {
    return ['admin', 'manager', 'employee'].includes(userRole)
  }

  hasValidRole(role: UserRole) {
    switch (role) {
      case 'admin':
        return this.role === 'admin'
      case 'manager':
        return this.role === 'admin' || this.role === 'manager'
      case 'employee':
        return (
          this.role === 'admin' || this.role === 'manager' || this.role === 'employee'
        )
    }
  }

  update(partialDto: Partial<UserDto>): User {
    return User.create({ ...this.dto, ...partialDto })
  }

  get name(): string {
    return this.props.name
  }

  get role(): UserRole {
    return this.props.role
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get companyId(): string {
    return this.props.companyId
  }

  get dto(): UserDto {
    return {
      id: this.id,
      role: this.props.role,
      email: this.props.email,
      name: this.props.name,
      password: this.props.password,
      companyId: this.props.companyId,
    }
  }
}
