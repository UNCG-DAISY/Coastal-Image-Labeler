import { routes } from '@/components/Constants/index'
import { apiRequest } from '../'
//import _ from 'lodash'

// interface Params {
//     cookie: string
//     res: any
// }

async function exportUserTag() {
  return await apiRequest({
    method: 'GET',
    route: routes.getReq.exportUserTag,
    headers: {
      credentials: 'include',
    },
  })
}

async function exportAllUserTags() {
  return await apiRequest({
    method: 'GET',
    route: routes.getReq.exportAllUserTag,
    headers: {
      credentials: 'include',
    },
  })
}

export { exportUserTag, exportAllUserTags }
