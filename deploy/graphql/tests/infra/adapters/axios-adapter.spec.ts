import { HttpMethod, type HttpClientParams } from '../../../src/application/contracts/http'
import { axiosAdapter } from '../../../src/infra/adapter/axios-adapter'
import axios from 'axios'

const axiosSpy = jest.fn().mockResolvedValue({ status: 200, data: 'any' })

jest.mock('axios', () => {
  return (params: HttpClientParams) => axiosSpy(params)
})

describe('Axios Adapter', () => {
  const request = { method: HttpMethod.post, headers: { authorization: 'token' }, url: 'http://any_url', data: { key: 1 } }
  it('should call axios with correct values', async () => {
    await axiosAdapter(request)

    expect(axiosSpy).toHaveBeenCalled()
    expect(axiosSpy).toHaveBeenCalledWith({ method: request.method, headers: request.headers, url: request.url, data: request.data })
  })

  it('should returns correct statusCode and body if axios fails', async () => {
    axiosSpy.mockRejectedValueOnce({
      response: {
        status: 500,
        data: 'any'
      }
    })

    const httpResponse = await axiosAdapter(request)

    expect(httpResponse).toEqual({ statusCode: 500, body: 'any' })
  })

  it('should returns correct value on success', async () => {
    const httpResponse = await axiosAdapter(request)

    expect(httpResponse).toEqual({ statusCode: 200, body: 'any' })
  })
})
