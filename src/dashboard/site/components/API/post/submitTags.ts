import { routes } from '../../Constants'
import { apiRequest } from '../'

interface Params {
  body: {
    userId: string
    imageId: string
    tags: any
    date: Date | number
  }
}

export async function submitImageTags({ body }: Params) {
  const data = await apiRequest({
    body: body,
    method: 'POST',
    route: routes.postReq.tagImage,
    headers: {
      credentials: 'include',
    },
  })

  return data
}
