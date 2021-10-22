import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '../models'

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})

export { mockAuthentication, mockAccountModel }
