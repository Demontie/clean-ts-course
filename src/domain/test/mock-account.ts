import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'
import { AccountModel } from '@/domain/models/account'

export const mockAddAccountParams = (): AddAccountParams => (
  {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
)

export const mockAccountModel = (): AccountModel => (
  {
    id: 'any_id',
    ...mockAddAccountParams()
  }
)

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
