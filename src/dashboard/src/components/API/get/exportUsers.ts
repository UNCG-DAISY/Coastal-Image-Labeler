import { routes } from '../../Constants'
import { fileDownload } from '../'

interface Params {
  cookie: string
  res: any
}

async function exportUser() {
  return await fileDownload({
    method: 'GET',
    route: routes.getReq.exportUserTag,
    headers: {
      credentials: 'include',
    },
  })
}

async function exportAllUser() {
  return await fileDownload({
    method: 'GET',
    route: routes.getReq.exportAllUserTag,
    headers: {
      credentials: 'include',
    },
  })
}

export { exportUser, exportAllUser }
