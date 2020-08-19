import { routes } from '../../Constants'
import { apiRequest } from '../'

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
