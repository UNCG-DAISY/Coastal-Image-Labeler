import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import LabelIcon from '@material-ui/icons/Label';


//Adds swiping
//import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import LogoutListButton from '../buttons/logoutListButton'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color:'inherit',
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const extraContentePages = [
    {
        title:'Date Source - NOAA',
        icon: <LinkIcon/>,
        href:'https://storms.ngs.noaa.gov/'
    },
    {
        title:'Date Source - USGS',
        icon: <LinkIcon/>,
        href:'https://coastal.er.usgs.gov/hurricanes/tools/oblique.php'
    },

]

function generateSideContent(pages,classes) {
    return pages.map((page, index) => {
        return (
            <a href={page.href} className= {classes.link} key={page.title}>
                <ListItem button >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.title} />
                </ListItem>
            </a>
        )
    })
}

function LoginSideDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const allowedPages = props.allowedPages
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
                <List>
                    {/* {generateSideContent(sideContentPages,classes)} */}
                    <a href={'/auth/home'} className= {classes.link} key={'Home'}>
                        <ListItem button >
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItem>
                    </a>

                    {
                      allowedPages?.tagger && 
                      <a href={'/auth/pickStorm'} className= {classes.link} key={'PickStorm'}>
                          <ListItem button >
                              <ListItemIcon><LabelIcon/></ListItemIcon>
                              <ListItemText primary={'Image Tag'} />
                          </ListItem>
                      </a>
                    }
                </List>
                
            <Divider />

            <ListItem>
                <ListItemText primary={'External Links'} />
            </ListItem>

            <List>
                {generateSideContent(extraContentePages,classes)}
            </List>

            <Divider />
            <List>
              <LogoutListButton/>
            </List>
        </div>
    
    );
}

LoginSideDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};



export default LoginSideDrawer;
