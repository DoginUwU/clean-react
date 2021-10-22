import { HttpPostClient } from '../../protocols/http/http-post-client'

class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (): Promise<void> {
    await this.httpPostClient.post({ url: this.url })
    await Promise.resolve()
  }
}

export { RemoteAuthentication }
