import { routes } from '@/components/Constants'
import { apiRequest } from '@/components/API/index'

interface Params {
  body: {
    userId: string
    imageId: string
    tags: any
    date: Date | number
  }
}

export async function submitScribbleImageTags({ body }: Params) {
  const data = await apiRequest({
    body: body,
    method: 'POST',
    route: routes.postReq.scribbleTagImage,
    headers: {
      credentials: 'include',
    },
  })

  return data
}
