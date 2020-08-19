import { ResponseType } from '../../../interfaces'

interface Params {
  route: string
  headers?: any
  method: 'POST' | 'GET'
  body?: any
}

export async function apiRequest(params: Params) {
  const { route, headers, method, body } = params

  const init: any = {}
  init.method = method
  init.headers = {
    'Content-Type': 'application/json',
    ...headers,
  }
  if (body) {
    init.body = JSON.stringify({
      ...body,
    })
  }
  const response = await fetch(route, init)

  try {
    const responseData: ResponseType = await response.json()

    return responseData
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message:
        `${response.status} - ${response.statusText} - ${route}` ?? 'Error',
    }
  }
}
