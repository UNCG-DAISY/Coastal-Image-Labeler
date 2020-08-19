// import { ResponseType } from '../../../../interfaces'
import { routes } from '../../Constants'
import { apiRequest } from '../'

interface Params {
  cookie: string
  res: any
}

export async function getStartTaggingTableData({ cookie }: Params) {
  const data = await apiRequest({
    method: 'POST',
    route: routes.postReq.getUserCatalogs,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  return data
}
