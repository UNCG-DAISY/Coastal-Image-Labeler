import {
  home,
  logout,
  startTagging,
  admin,
  exportTags,
} from '../../Constants/navigation'
import { UserProp } from '../../../../interfaces'

function determineNavItems(user: UserProp) {
  const res = {
    center: [home, exportTags],
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
