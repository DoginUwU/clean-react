import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '../models/account-model'

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})

export { mockAuthentication, mockAccountModel }
