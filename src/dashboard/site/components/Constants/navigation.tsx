// import { Logout, Login } from '../Button/premadeButtons'
import Button from '@material-ui/core/Button'

interface NavigationItemType {
  name: string
  route: string
  icon?: string
  element?: JSX.Element
}

interface NavigationItemsType {
  default: {
    center?: NavigationItemType[]
    right?: NavigationItemType[]
  }
  basic: {
    center: NavigationItemType[]
    right: NavigationItemType[]
  }
  admin: {
    center: NavigationItemType[]
    right: NavigationItemType[]
  }
}

export const login = {
  name: 'Login',
  route: '/login',
  element: <Button href="/login">Login</Button>,
}
export const logout = {
  name: 'Logout',
  route: '/logout',
  element: <Button href="/logout">Logout</Button>,
}
export const home = {
  name: 'Home',
  icon: '',
  route: '/auth/home',
}
export const startTagging = {
  name: 'Start Tagging',
  icon: '',
  route: '/auth/startTagging',
}
export const admin = {
  name: 'Admin',
  icon: '',
  route: '/auth/admin',
}

const navigationItems: NavigationItemsType = {
  default: {
    center: [],
    right: [login],
  },
  basic: {
    center: [home, startTagging],
    right: [logout],
  },
  admin: {
    center: [home, startTagging, admin],
    right: [logout],
  },
}

export { navigationItems }
