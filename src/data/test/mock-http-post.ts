import faker from 'faker'
import { HttpPostParams } from '../protocols/http'

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export { mockPostRequest }
