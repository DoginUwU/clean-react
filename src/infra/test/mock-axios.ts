import axios from 'axios'
import faker from 'faker'

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockAxios = (): jest.Mocked<typeof axios> => {
  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: 200
  })

  return mockedAxios
}

export { mockAxios }
