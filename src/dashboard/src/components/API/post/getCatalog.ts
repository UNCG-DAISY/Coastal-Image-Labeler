import { routes } from '@/components/Constants'
import { apiRequest } from '@/components/API/index'

interface Params {
  cookie: string
  res: any
  catalogId: string
}

export async function getCatalog({ cookie, catalogId }: Params) {
  return await apiRequest({
    body: {
      catalogId: catalogId,
    },
    method: 'POST',
    route: routes.postReq.getCatalog + `?_id=${catalogId}`,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })
}

export async function getCatalogDetails(cookie) {
  return await apiRequest({
    method: 'POST',
    route: routes.postReq.getCatalogDetails,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })
}
