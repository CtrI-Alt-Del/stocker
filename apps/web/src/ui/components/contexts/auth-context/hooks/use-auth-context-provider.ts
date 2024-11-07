'use client'

import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { User } from '@stocker/core/entities'
import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import type { UserRole } from '@stocker/core/types'

import { CACHE, COOKIES, ROUTES } from '@/constants'
import { useApi, useCache, useNavigation, useToast } from '@/ui/hooks'
import type { deleteCookieAction, setCookieAction } from '@/actions'

type UseAuthContextProvider = {
  jwt: string | null
  setCookieAction: typeof setCookieAction
  deleteCookieAction: typeof deleteCookieAction
}

export function useAuthContextProvider({
  jwt,
  setCookieAction,
  deleteCookieAction,
}: UseAuthContextProvider) {
  const userDto = jwt ? jwtDecode<UserDto>(jwt) : null
  const [user, setUser] = useState<User | null>(userDto ? User.create(userDto) : null)
  const { authService, companiesService } = useApi()
  const { showError } = useToast()
  const { navigateTo } = useNavigation()

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

      await setCookieAction(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)

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

      await setCookieAction(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)

      const route = getRouteByUserRole(user.role)
      navigateTo(route)
      return
    }

    showError(response.errorMessage)
  }

  async function logout() {
    const response = await authService.logout()

    if (response.isSuccess) {
      await deleteCookieAction(COOKIES.jwt.key)
      setUser(null)
      navigateTo(ROUTES.login)
      return
    }

    showError('Não foi possível sair da sua conta, tente novamente mais tarde')
  }

  async function update(userDto: Partial<UserDto>, companyDto: Partial<CompanyDto>) {
    const response = await authService.updateAccount(userDto, companyDto)

    if (response.isSuccess) {
      await setCookieAction(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)
      if (user) setUser(user.update(userDto))
      return
    }

    showError('Não foi possível sair da sua conta, tente novamente mais tarde')
  }

  async function fetchCompany() {
    if (!user) return

    const response = await companiesService.getCompany(user.companyId)

    if (response.isSuccess) {
      return response.body
    }

    response.throwError()
  }

  const { data } = useCache({
    fetcher: fetchCompany,
    key: CACHE.company.key,
    isEnabled: Boolean(user),
  })

  return {
    user,
    company: data ? data : null,
    login,
    subscribe,
    logout,
    update,
  }
}
