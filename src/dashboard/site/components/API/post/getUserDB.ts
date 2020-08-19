import { routes } from '../../Constants'
import { apiRequest } from '../'

interface Params {
  cookie: string
  res: any
}

async function getUserDB({ cookie, res }: Params) {
  const data = await apiRequest({
    method: 'POST',
    route: routes.postReq.getUser,
    headers: {
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })

  if (data.success) {
    return data.data.user
  }
  //For whatever reasons, if fail redirect to landing page
  res.redirect('/')
  return undefined
}

export { getUserDB }
