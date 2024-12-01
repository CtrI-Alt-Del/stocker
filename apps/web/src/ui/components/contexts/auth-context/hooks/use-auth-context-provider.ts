'use client'

import { type RefObject, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { Company, User } from '@stocker/core/entities'
import type { CompanyDto, UserDto } from '@stocker/core/dtos'

import { CACHE, COOKIES, ROUTES } from '@/constants'
import { useAuthWebSocket, useCache, useNavigation, useToast } from '@/ui/hooks'
import type { deleteCookieAction, setCookieAction } from '@/actions'
import type { IAuthService, ICompaniesService } from '@stocker/core/interfaces'
import type { DialogRef } from '@/ui/components/commons/dialog/types'
import type { RoleName } from '@stocker/core/types'
import { Role } from '@stocker/core/structs'

type UseAuthContextProvider = {
  jwt: string | null
  authService: IAuthService
  companiesService: ICompaniesService
  alertDialogRef: RefObject<DialogRef>
  setCookieAction: typeof setCookieAction
  deleteCookieAction: typeof deleteCookieAction
}

export function useAuthContextProvider({
  jwt,
  authService,
  companiesService,
  alertDialogRef,
  setCookieAction,
  deleteCookieAction,
}: UseAuthContextProvider) {
  const userDto = jwt ? jwtDecode<UserDto>(jwt) : null
  const [user, setUser] = useState<User | null>(userDto ? User.create(userDto) : null)
  const { showError, showSuccess } = useToast()
  const { navigateTo } = useNavigation()

  async function fetchCompany() {
    if (!user) return

    const response = await companiesService.getCompany(user.companyId)

    if (response.isSuccess) {
      return response.body
    }

    response.throwError()
  }

  async function fetchPermissions() {
    const response = await authService.getPermissions()

    if (response.isSuccess) {
      return Role.create(response.body.name, response.body.permissions)
    }

    response.throwError()
  }

  const { data: comapanyDto, mutate } = useCache({
    fetcher: fetchCompany,
    key: CACHE.company.key,
    isEnabled: Boolean(user),
  })

  const company = comapanyDto ? Company.create(comapanyDto) : null

  const { data: userRole } = useCache({
    fetcher: fetchPermissions,
    key: CACHE.permissions.key,
  })

  function getRouteByUserRole(role: RoleName) {
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

      navigateTo(ROUTES.login)
      return
    }

    showError(response.errorMessage)
  }

  async function logout() {
    setUser(null)
    navigateTo(ROUTES.login)
    setTimeout(async () => {
      await deleteCookieAction(COOKIES.jwt.key)
    }, 2500)
  }

  async function updateAccount(
    userDto: Partial<UserDto>,
    companyDto: Partial<CompanyDto>,
  ) {
    const response = await authService.updateAccount(userDto, companyDto)

    if (response.isSuccess) {
      if (response.body.jwt)
        await setCookieAction(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)

      if (user && Object.keys(userDto).length > 0) setUser(user.update(userDto))
      if (company && Object.keys(companyDto).length > 0)
        mutate(company?.update(companyDto))

      showSuccess('Conta atualizada')
      return
    }

    showError('Não foi possível atualizar sua conta, tente novamente mais tarde')
  }

  async function confirmAuth(password: string) {
    if (!user) return false

    const response = await authService.confirmAuth(password)

    if (response.isSuccess) {
      const isAuthenticated = response.body
      if (!isAuthenticated) {
        showError('Senha inválida')
        return false
      }
      return isAuthenticated
    }

    showError('Não foi possível confirmar sua senha, tente novamente mais tarde')
    return false
  }

  async function deleteAccount() {
    const response = await authService.deleteAccount()

    if (response.isSuccess) {
      logout()
      return
    }

    showError('Não foi possível deletar sua conta, tente novamente mais tarde')
  }

  async function resetPassword(email: string, password: string) {
    if (!user) return
    const response = await authService.resetPassword(email, password)

    if (response.isSuccess) {
      await setCookieAction(COOKIES.jwt.key, response.body.jwt, COOKIES.jwt.duration)
      showSuccess('Senha redefinida com sucesso!')
      user.hasFirstPasswordReset = false
      setUser(user)
      return
    }
    showError('Não foi capaz redefinir sua senha por favor tente mais tarde')
  }

  async function handleAccountLogged(loggedUserId: string) {
    if (user && loggedUserId === user.id) alertDialogRef.current?.open()
  }

  async function handleLogoutUnkownAccount(unknownAccountJwt: string) {
    if (jwt !== unknownAccountJwt) await logout()
  }

  const { logoutUnkownAccount } = useAuthWebSocket({
    userId: user?.id,
    onLogin: handleAccountLogged,
    onLogoutUnkownAccount: handleLogoutUnkownAccount,
  })

  function handleUnkownAccountDetect() {
    if (jwt) logoutUnkownAccount(jwt)
  }

  console.log(user?.hasFirstPasswordReset)

  return {
    user,
    company,
    userRole,
    login,
    logout,
    subscribe,
    resetPassword,
    updateAccount,
    deleteAccount,
    confirmAuth,
    handleUnkownAccountDetect,
  }
}
