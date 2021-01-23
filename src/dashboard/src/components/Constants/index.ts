import { navigationItems } from './navigation'
import { ImagePathTypes } from '@/interfaces/index'
const protocal = process?.env?.NEXT_PUBLIC_PROTOCOL
const apiCall = (route) => {
  return `${protocal}://${process?.env?.NEXT_PUBLIC_DOMAIN_NAME}${route}`
}
const routes = {
  postReq: {
    getUser: apiCall('/api/user/getUser'),
    getUserCatalogs: apiCall('/api/catalog/userCatalogs'),
    catalogMembership: apiCall('/api/catalog/catalogMembership'),
    isArchiveValid: apiCall('/api/archive/exists'),
    getUserAssignedImage: apiCall('/api/assignedImages/getImage'),
    getAllUserAssignedImages: apiCall('/api/assignedImages/getAllCurrent'),
    hasAssignedImages: apiCall('/api/user/hasAssignedImages'),
    getCatalogQuestionSet: apiCall('/api/catalog/questionSet'),
    tagImage: apiCall('/api/tags/tagImage'),
    doddleTagImage: apiCall('/api/tags/tagImageXXX'),
    getCatalog: apiCall('/api/catalog'),
    getArchive: apiCall('/api/archive'),
  },
  getReq: {
    showImage: (type: ImagePathTypes, id: any) =>
      apiCall(`/api/image/${id}/${type}`),
    exportUserTag: apiCall('/api/tags/export'),
    exportAllUserTag: apiCall('/api/tags/export/all'),
    getGlobalNotifications: apiCall('/api/notifications'),
  },
}
const uiConstants = {
  drawerWidth: 240,
}

const defaultTitle = 'Coastal Image Labeler'

const tabLogoURL =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/water-wave_1f30a.png'

export {
  protocal,
  apiCall,
  uiConstants,
  navigationItems,
  defaultTitle,
  routes,
  tabLogoURL,
}
