import LockOpenIcon from '@material-ui/icons/LockOpen'
import HomeIcon from '@material-ui/icons/Home'
import LabelIcon from '@material-ui/icons/Label'
import SecurityIcon from '@material-ui/icons/Security'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import HelpIcon from '@material-ui/icons/Help'

import * as Colors from '@material-ui/core/colors'

import { NavItem } from '@/interfaces/index'
import { theme } from '@/site/components/theme'

export const contactUs: NavItem = {
  name: 'Contact Us',
  route: '/contact_us',
  icon: (props) => <HelpIcon {...props} />,
  style: {
    color: theme.palette.secondary.main,
  },
}

export const login: NavItem = {
  name: 'Login',
  route: '/login',
  icon: (props) => <LockOpenIcon {...props} />,
  style: {
    color: theme.palette.secondary.main,
  },
}

export const logout: NavItem = {
  name: 'Logout',
  route: '/logout',
  icon: (props) => <ExitToAppIcon {...props} />,
  style: {
    color: Colors.red[700],
    borderColor: Colors.red[700],

    hoverTextColor: 'white',
    hoverBackgroundColor: Colors.red[700],
  },
}

export const home: NavItem = {
  name: 'Home',
  route: '/auth/home',
  icon: (props) => <HomeIcon {...props} />,
  style: {
    color: theme.palette.secondary.main,
  },
}
export const labelNewArchive: NavItem = {
  name: 'Label New Archive',
  route: '/auth/labelNewArchive',
  icon: (props) => <LabelIcon {...props} />,
  style: {
    color: theme.palette.secondary.main,
  },
}
export const exportTags: NavItem = {
  name: 'Export Labels',
  route: '/auth/export',
  icon: (props) => <CloudDownloadIcon {...props} />,
  style: {
    color: theme.palette.secondary.main,
  },
}
export const admin: NavItem = {
  name: 'Admin',
  route: '/auth/admin',
  icon: (props) => <SecurityIcon {...props} />,
  style: {
    color: theme.palette.secondary.main,
  },
}

const defaultNavItems = {
  center: [],
  right: [],
}

export const navigationItems = {
  defaultNavItems: defaultNavItems,
  landingPage: {
    center: [login, contactUs],
    right: [],
  },
}
