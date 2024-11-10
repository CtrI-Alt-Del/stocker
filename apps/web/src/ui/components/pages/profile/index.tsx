import { EmployeesCards } from './employees-cards'
import { ProfileForm } from './profile-form'

export const ProfilePage = () => {
  return (
    <div className='p-6 min-h-screen max-w-5xl mx-auto'>
      <h1 className='text-3xl font-semibold'>Painel do Administrador</h1>
      <div className='grid grid-cols-[1.5fr,1fr] gap-12'>
        <ProfileForm />
        <div className='items-center'>
          <h1 className='text-xl font-semibold mb-3'>Usuários cadastrados</h1>
          <EmployeesCards />
        </div>
      </div>
    </div>
  )
}
