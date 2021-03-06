import { routes } from '@/components/Constants'
import { apiRequest } from '@/components/API/index'

interface Params {
  cookie: string
  res: any
}

export async function getHasAssignedImages({ cookie }: Params) {
  const data = await apiRequest({
    method: 'POST',
    route: routes.postReq.hasAssignedImages,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  return data
}
