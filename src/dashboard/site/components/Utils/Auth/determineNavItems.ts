import {
  home,
  logout,
  labelNewArchive,
  admin,
  exportTags,
  contactUs,
  login,
} from '../../Constants/navigation'
import { UserProp } from '../../../../interfaces'

function determineNavItems(user: UserProp) {
  const res = {
    center: [],
    right: [],
  }

  if (user) {
    res.center.push(home)
    res.right.push(logout)
  } else {
    res.center.push(login)
  }

  if (user?.data?.roles.includes('tagger')) {
    res.center.push(exportTags)
    res.center.push(labelNewArchive)
  }

  if (user?.data?.roles.includes('admin')) {
    res.center.push(admin)
  }

  res.center.push(contactUs)
  return res
}

export { determineNavItems }
