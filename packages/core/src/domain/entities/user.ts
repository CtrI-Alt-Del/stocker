import type { UserDto } from '../../dtos'
import { ValidationError } from '../../errors'
import type { UserRole } from '../../types'
import { Entity } from '../abstracts'

type UserProps = {
  role: UserRole
  email: string
  name: string
  password?: string
  companyId: string
  hasFirstPasswordReset: boolean
}

const DEAFAULT_PASSWORD = 'stocker@123'

export class User extends Entity<UserProps> {
  static create(dto: UserDto, hasPassword = true): User {
    const role = dto.role

    if (!User.isUserRole(role)) {
      throw new ValidationError(`${role} não é um tipo de usuário válido`)
    }

    const user = new User(
      {
        name: dto.name,
        email: dto.email,
        companyId: dto.companyId,
        role: role,
        hasFirstPasswordReset: dto.hasFirstPasswordReset ?? true,
      },
      dto.id,
    )

    if (hasPassword) {
      user.password = dto.password ?? DEAFAULT_PASSWORD
    }

    console.log('password', hasPassword)

    return user
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

  get password(): string | undefined {
    return this.props.password
  }

  set password(password: string) {
    this.props.hasFirstPasswordReset = false
    this.props.password = password
  }

  get hasFirstPasswordReset(): boolean {
    return this.props.hasFirstPasswordReset
  }

  set hasFirstPasswordReset(status: boolean) {
    this.props.hasFirstPasswordReset = status
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
      hasFirstPasswordReset: this.props.hasFirstPasswordReset,
      companyId: this.props.companyId,
    }
  }
}
