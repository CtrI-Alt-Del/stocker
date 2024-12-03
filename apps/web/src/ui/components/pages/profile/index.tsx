import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { EmployeesCards } from './employees-cards'
import { ProfileForm } from './profile-form'
import { RolesControl } from './roles-control'
import { CompaniesService } from '@/api/services'
import { COOKIES } from '@/constants'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import type { UserDto } from '@stocker/core/dtos'

export const ProfilePage = async () => {
  const jwt = cookies().get(COOKIES.jwt.key)
  if (!jwt?.value) return

  const userDto = jwtDecode<UserDto>(jwt.value)
  const apiClient = await NextServerApiClient({ isCacheEnabled: false })
  const companiesService = CompaniesService(apiClient)
  const response = await companiesService.getCompanyRoles(userDto.companyId)
  if (response.isFailure) response.throwError()

  return (
    <div className='p-6 min-h-screen max-w-5xl mx-auto pb-40'>
      <h1 className='text-3xl font-semibold'>Conta do Administrador</h1>
      <div className='grid grid-cols-1  md:grid-cols-[1.5fr,1fr] gap-12'>
        <ProfileForm />
        <div className='items-center'>
          <h1 className='text-xl font-semibold mb-3'>Usuários cadastrados</h1>
          <EmployeesCards />
        </div>
      </div>
      <div className='mt-12'>
        <RolesControl roles={response.body} companyId={userDto.companyId} />
      </div>
    </div>
  )
}
