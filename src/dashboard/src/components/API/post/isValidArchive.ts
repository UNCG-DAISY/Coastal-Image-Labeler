import { routes } from '@/site/components/Constants'
import { apiRequest } from '@/site/components/API/index'

interface Params {
  cookie: string
  res: any
  catalogId?: string
  archiveId: string
}

export async function isValidArchive({ cookie, catalogId, archiveId }: Params) {
  const bodyObj: { catalogId?: string; archiveId } = {
    archiveId: archiveId,
  }
  //optionally add catalogId if it is defined
  if (catalogId) {
    bodyObj.catalogId = catalogId
  }

  const data = await apiRequest({
    body: bodyObj,
    method: 'POST',
    route: routes.postReq.isArchiveValid,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  return data
}
