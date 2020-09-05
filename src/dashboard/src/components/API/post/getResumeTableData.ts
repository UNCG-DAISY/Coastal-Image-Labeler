import { routes } from '@/components/Constants'
import { apiRequest } from '@/components/API/index'

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
