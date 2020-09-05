import { routes } from '@/components/Constants'
import { apiRequest } from '@/components/API/index'

interface Params {
  cookie: string
  res: any
  catalogId: string
}

export async function catalogQuestionSet({ cookie, catalogId }: Params) {
  const data = await apiRequest({
    body: {
      catalogId: catalogId,
    },
    method: 'POST',
    route: routes.postReq.getCatalogQuestionSet,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  return data
}
