import {
  home,
  logout,
  labelNewArchive,
  admin,
  exportTags,
  uploadCatalogs,
  contactUs,
} from '../../Constants/navigation'
import { UserProp } from '../../../../interfaces'

function determineNavItems(user: UserProp) {
  const res = {
    center: [home],
    right: [logout],
  }
  res.center.push(exportTags)
  if (user?.data?.roles.includes('tagger')) {
    res.center.push(labelNewArchive)
  }

  if (user?.data?.roles.includes('admin')) {
    res.center.push(admin)
    res.center.push(uploadCatalogs)
  }

  res.center.push(contactUs)
  return res
}

export { determineNavItems }
