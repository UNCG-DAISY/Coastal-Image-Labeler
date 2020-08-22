import LockOpenIcon from '@material-ui/icons/LockOpen'
import HomeIcon from '@material-ui/icons/Home'
import LabelIcon from '@material-ui/icons/Label'
import SecurityIcon from '@material-ui/icons/Security'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import * as Colors from '@material-ui/core/colors'

import { NavItem } from '../../../interfaces'
import { theme } from '../theme'

export const login: NavItem = {
  name: 'Login',
  route: '/login',
  icon: (props) => <LockOpenIcon {...props} />,
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
export const startTagging: NavItem = {
  name: 'Label New Archive',
  route: '/auth/startTagging',
  icon: (props) => <LabelIcon {...props} />,
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
    center: [],
    right: [login],
  },
}
