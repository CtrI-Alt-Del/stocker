import { describe, expect, it } from 'vitest'

import { UsersFaker } from '../../../../__tests__/fakers'
import { ValidationError } from '../../../errors'

describe('User entity', () => {
  it('should not be created if its role is invalid', () => {
    expect(() => {
      UsersFaker.fake({ role: 'invalid role' })
    }).toThrowError(ValidationError)
  })

  it('should validate role', () => {
    let user = UsersFaker.fake({ role: 'admin' })

    expect(user.hasValidRole('admin')).toBeTruthy()
    expect(user.hasValidRole('manager')).toBeTruthy()
    expect(user.hasValidRole('employee')).toBeTruthy()

    user = UsersFaker.fake({ role: 'manager' })

    expect(user.hasValidRole('admin')).toBeFalsy()
    expect(user.hasValidRole('manager')).toBeTruthy()
    expect(user.hasValidRole('employee')).toBeTruthy()

    user = UsersFaker.fake({ role: 'employee' })

    expect(user.hasValidRole('admin')).toBeFalsy()
    expect(user.hasValidRole('manager')).toBeFalsy()
    expect(user.hasValidRole('employee')).toBeTruthy()
  })

  it('should be update', () => {
    const user = UsersFaker.fake({ role: 'admin' })

    expect(user).toHaveProperty('role', 'admin')

    const updatedUser = user.update({ role: 'employee' })

    expect(updatedUser).toHaveProperty('role', 'employee')
  })
})
