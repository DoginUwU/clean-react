import axios from 'axios'
import faker from 'faker'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct url', async () => {
    const sut = makeSut()
    const url = faker.internet.url()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
