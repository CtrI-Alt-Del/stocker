import { describe, expect, it } from 'vitest'

import { UsersFaker } from '../../../../__tests__/fakers'
import { ValidationError } from '../../../errors'

describe('User entity', () => {
  it('should be update', () => {
    const user = UsersFaker.fake({ role: 'admin' })

    expect(user).toHaveProperty('role', 'admin')

    const updatedUser = user.update({ role: 'employee' })

    expect(updatedUser).toHaveProperty('role', 'employee')
  })
})
