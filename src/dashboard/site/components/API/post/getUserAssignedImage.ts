import { routes } from '../../Constants'
import { apiRequest } from '../'

interface Params {
  cookie: string
  res: any
  //   catalogID?: string
  archiveId: string
}

export async function getUserAssignedImage({ cookie, archiveId }: Params) {
  const data = await apiRequest({
    body: {
      archiveId: archiveId,
    },
    method: 'POST',
    route: routes.postReq.getUserAssignedImage,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  return data
}
