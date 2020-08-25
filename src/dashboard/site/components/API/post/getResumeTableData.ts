import { routes } from '../../Constants'
import { apiRequest } from '../'

interface Params {
  cookie?: string
  res?: any
}

export async function getResumeTableData() {
  const data = await apiRequest({
    method: 'POST',
    route: routes.postReq.getAllUserAssignedImages,
    headers: {
      credentials: 'include',
      //cookie: cookie ?? null,
    },
  })

  return data
}
