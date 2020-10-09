import { routes } from '../../Constants'
import { fileDownload } from '../'

interface Params {
  cookie: string
  res: any
}

async function exportUser(body = {}) {
  return await fileDownload({
    method: 'POST',
    body: body,
    route: routes.getReq.exportUserTag,
    headers: {
      credentials: 'include',
    },
  })
}

async function exportAllUser(body = {}) {
  return await fileDownload({
    method: 'POST',
    body: body,
    route: routes.getReq.exportAllUserTag,
    headers: {
      credentials: 'include',
    },
  })
}

export { exportUser, exportAllUser }
