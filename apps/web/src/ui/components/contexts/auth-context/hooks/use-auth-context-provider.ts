'use client'

import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { User } from '@stocker/core/entities'
import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import type { UserRole } from '@stocker/core/types'

import { COOKIES, ROUTES } from '@/constants'
import { useApi, useCookies, useNavigation, useToast } from '@/ui/hooks'

export function useAuthContextProvider(userDto: UserDto | null) {
  const [user, setUser] = useState<User | null>(userDto ? User.create(userDto) : null)
  const { authService } = useApi()
  const { showError } = useToast()
  const { navigateTo } = useNavigation()
  const { setCookie, deleteCookie } = useCookies()

  function getRouteByUserRole(role: UserRole) {
    switch (role) {
      case 'admin':
        return ROUTES.records.employees
      case 'manager':
        return ROUTES.dashboard
      case 'employee':
        return ROUTES.inventory.stocks
      default:
        return ROUTES.inventory.stocks
    }
  }

  async function login(email: string, password: string) {
    const response = await authService.login(email, password)

    if (response.isSuccess) {
      const userDto = jwtDecode<UserDto>(response.body.jwt)
      const user = User.create(userDto)
      setUser(user)

      await setCookie(COOKIES.jwt.key, response.body.jwt)

      const route = getRouteByUserRole(user.role)
      navigateTo(route)
      return
    }

    showError(response.errorMessage)
  }

  async function subscribe(userDto: UserDto, companyDto: CompanyDto) {
    const response = await authService.subscribe(userDto, companyDto)

    if (response.isSuccess) {
      const userDto = jwtDecode<UserDto>(response.body.jwt)
      const user = User.create(userDto)
      setUser(user)

      await setCookie(COOKIES.jwt.key, response.body.jwt)

      const route = getRouteByUserRole(user.role)
      navigateTo(route)
      return
    }

    showError(response.errorMessage)
  }

  async function logout() {
    const response = await authService.logout()

    if (response.isSuccess) {
      await deleteCookie(COOKIES.jwt.key)
      setUser(null)
      navigateTo(ROUTES.dashboard)
      return
    }

    showError('Não foi possível sair da sua conta, tente novamente mais tarde')
  }

  return {
    user,
    login,
    subscribe,
    logout,
  }
}
