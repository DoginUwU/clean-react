import axios from 'axios'
import { HttpPostParams } from '@/data/protocols/http'

class AxiosHttpClient {
  async post (params: HttpPostParams<any>): Promise<void> {
    await axios(params.url)
  }
}

export { AxiosHttpClient }
