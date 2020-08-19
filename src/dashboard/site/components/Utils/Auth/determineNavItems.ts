import { home, logout, startTagging, admin } from '../../Constants/navigation'
import { UserProp } from '../../../../interfaces'

function determineNavItems(user: UserProp) {
  const res = {
    center: [home],
    right: [logout],
  }

  if (user?.data?.roles.includes('tagger')) {
    res.center.push(startTagging)
  }

  if (user?.data?.roles.includes('admin')) {
    res.center.push(admin)
  }

  return res
}

export { determineNavItems }
