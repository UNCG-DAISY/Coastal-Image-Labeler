import {
  home,
  logout,
  labelNewArchive,
  admin,
  exportTags,
  contactUs,
} from '../../Constants/navigation'
import { UserProp } from '../../../../interfaces'

function determineNavItems(user: UserProp) {
  const res = {
    center: [home],
    right: [logout],
  }

  if (user?.data?.roles.includes('tagger')) {
    res.center.push(exportTags)
    res.center.push(labelNewArchive)
  }

  if (user?.data?.roles.includes('admin')) {
    res.center.push(exportTags)
    res.center.push(admin)
  }

  res.center.push(contactUs)
  return res
}

export { determineNavItems }
