import { routes } from '@/components/Constants'
import { apiRequest } from '@/components/API/index'

interface Params {
  cookie: string
  res: any
  redirect?: boolean
}

async function getUserDB({ cookie, res, redirect = true }: Params) {
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
  console.log(data.message)
  if (redirect) {
    res.redirect('/')
  }

  return undefined
}

export { getUserDB }
