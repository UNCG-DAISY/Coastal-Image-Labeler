import { routes } from '../../Constants'
import { apiRequest } from '../'

interface Params {
  cookie: string
  res: any
  archiveId: string
}

export async function getArchive({ cookie, archiveId }: Params) {
  const data = await apiRequest({
    body: {
      archiveId: archiveId,
    },
    method: 'POST',
    route: routes.postReq.getArchive + `?_id=${archiveId}`,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  return data
}
