import { EmployeesCards } from './employees-cards'
import { ProfileForm } from './profile-form'

export const ProfilePage = () => {
  return (
    <div className='flex flex-col items-center p-6 min-h-screen'>
      <div className='flex flex-col w-full max-w-4xl space-y-4'>
        <h1 className='text-3xl font-black'>Painel do Administrador</h1>
        <div className='flex flex-wrap lg:flex-nowrap justify-center'>
          <ProfileForm />
          <div className='items-center'>
            <h1 className='text-xl font-black'>Usuários cadastrados</h1>
          <EmployeesCards />
        </div>
        </div>
      </div>
    </div>
  )
}
