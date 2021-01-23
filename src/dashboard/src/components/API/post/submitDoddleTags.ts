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

export async function submitDoddleImageTags({ body }: Params) {
  const data = await apiRequest({
    body: body,
    method: 'POST',
    route: routes.postReq.doddleTagImage,
    headers: {
      credentials: 'include',
    },
  })

  return data
}
