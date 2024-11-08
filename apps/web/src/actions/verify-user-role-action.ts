'use server'

import { COOKIES } from '@/constants'
import type { UserDto } from '@stocker/core/dtos'
import { User } from '@stocker/core/entities'
import type { UserRole } from '@stocker/core/types'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export async function verifyUserRoleAction(role: UserRole) {
  const jwt = cookies().get(COOKIES.jwt.key)
  if (!jwt?.value) return false

  const user = User.create(jwtDecode<UserDto>(jwt.value))
  return user.hasValidRole(role)
}
