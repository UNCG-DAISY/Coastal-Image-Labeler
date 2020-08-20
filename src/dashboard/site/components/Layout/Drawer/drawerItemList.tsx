import { List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
// import { uiConstants } from '../../Constants'

// const drawerWidth = uiConstants.drawerWidth
export function DrawerItemList(navItems = { center: [], right: [] }) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <div className={`${classes.title}`}>
        <List>
          {navItems.center.map((item, index) => {
            return (
              <a
                href={item.route}
                className={classes.noDecor}
                key={index + item.name}
              >
                <ListItem button>
                  <React.Fragment>
                    <ListItemText
                      className={classes.spacedButton}
                      color="inherit"
                    >
                      {item.name}
                    </ListItemText>
                  </React.Fragment>
                </ListItem>
              </a>
            )
          })}
        </List>
      </div>
      <div>
        {navItems.right.map((item, index) => {
          return (
            <a
              href={item.route}
              className={classes.noDecor}
              key={index + item.name}
            >
              <ListItem button>
                <React.Fragment>
                  <ListItemText
                    className={classes.spacedButton}
                    color="inherit"
                  >
                    {item.name}
                  </ListItemText>
                </React.Fragment>
              </ListItem>
            </a>
          )
        })}
      </div>
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  spacedButton: {
    marginRight: `5px`,
  },
  noDecor: {
    textDecoration: 'none',
    color: 'inherit',
  },
})

// function genUseStyle({ showDrawer }) {
//     return makeStyles((theme) => ({
//       appBar: {
//         zIndex: theme.zIndex.drawer + 1,
//       },
//       root: {
//         display: 'flex',
//       },
//       drawer: {
//         [theme.breakpoints.up('sm')]: {
//           width: showDrawer ? drawerWidth : 0,
//           flexShrink: 0,
//         },
//       },
//       toolbar: theme.mixins.toolbar,
//       drawerPaper: {
//         width: showDrawer ? drawerWidth : 0,
//       },
//       content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//       },
//       showDesktop: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//           display: 'flex',
//         },
//       },
//       showMobile: {
//         display: 'flex',
//         [theme.breakpoints.up('sm')]: {
//           display: 'none',
//         },
//       },

//     }))
// }
