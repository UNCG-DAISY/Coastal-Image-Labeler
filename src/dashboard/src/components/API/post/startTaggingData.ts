import { routes } from '@/site/components/Constants'
import { apiRequest } from '@/site/components/API/index'

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
