import { routes } from '../../Constants'
import { apiRequest } from '../'

interface Params {
  cookie: string
  res: any
}

async function exportZenodoUser(body) {
  return await apiRequest({
    method: 'POST',
    body: body,
    route: routes.getReq.exportZenodoTag,
    headers: {
      credentials: 'include',
    },
  })
}

export { exportZenodoUser }
