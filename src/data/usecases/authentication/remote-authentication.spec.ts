import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
  url: string
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy,
    url
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy, url } = makeSut()
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
