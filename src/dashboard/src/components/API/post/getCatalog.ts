import { routes } from '@/site/components/Constants'
import { apiRequest } from '@/site/components/API/index'

interface Params {
  cookie: string
  res: any
  catalogId: string
}

export async function getCatalog({ cookie, catalogId }: Params) {
  const data = await apiRequest({
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

  return data
}
