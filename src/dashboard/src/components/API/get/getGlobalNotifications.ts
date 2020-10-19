import { routes } from '@/components/Constants'
import { apiRequest } from '@/components/API/index'

export async function getGlobalNotifications() {
  const data = await apiRequest({
    method: 'GET',
    route: routes.getReq.getGlobalNotifications,
  })
  return data
}
