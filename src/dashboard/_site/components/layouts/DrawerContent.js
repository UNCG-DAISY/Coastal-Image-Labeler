import React from 'react'
import { withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LinkIcon from '@material-ui/icons/Link';

import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Label';

import LogoutListButton from '../buttons/logoutListButton'

import theme from '../theme';

const colorOfLinks = theme.palette.secondary.main
class DrawerContent extends React.Component{
    
    render() {
        const {
            user,
            classes
        } = this.props
        // if(user) {
        //     console.log(Object.keys(user))
        //     console.log(user.allowedPages)
        // }
       
        return (
            <React.Fragment>
                <div style={{
                    height:"100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection:'column',
                }}>
                    
                    <div>
                        <div className={classes.toolbar} />
                        <Divider />
                        
                        <List>
                            {
                                user?
                                    <React.Fragment>
                                        <LoggedInLinks classes={classes} allowedPages={user.allowedPages}/>
                                    </React.Fragment>
                                :
                                    generateSideContent(notLoggedInLinks,classes)
                            }
                        </List>     
                        <Divider />
                                
                        {/* <ListItem>
                            <ListItemText primary={'External Links'} />
                        </ListItem> */}
                        
                        {/* Links to other sites */}
                        {/* <List>
                            {generateSideContent(extraContentePages,classes)}
                        </List> */}

                        {/* Logout button         */}
                        <Divider />
                    </div>
                    <div>
                        <List>
                            <LogoutListButton/>
                        </List>
                    </div>
                  
                    
                  
                </div>
                
            </React.Fragment>
        )
    }
}


function LoggedInLinks(props) {
    const {
        allowedPages,
        classes
    } = props

    
    return (
        <React.Fragment>
            <a href={'/auth/home'} className= {classes.link} key={'Home'} >
                <ListItem button style={{color:colorOfLinks}}>
                    <ListItemIcon style={{color:'inherit'}}><HomeIcon/></ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
            </a>
            {
                allowedPages?.tagger &&
                 <a href={'/auth/pickCatalog'} className= {classes.link} key={'PickStorm'}>
                    <ListItem button style={{color:colorOfLinks}}>
                        <ListItemIcon style={{color:'inherit'}}><LabelIcon/></ListItemIcon>
                        <ListItemText primary={'Pick Catalog to Label'} />
                    </ListItem>
                </a>
            }
            {/* {
                allowedPages?.admin &&
                 <a href={'/auth/pickStorm'} className= {classes.link} key={'AdminPage'}>
                    <ListItem button style={{color:colorOfLinks}}>
                        <ListItemIcon style={{color:'inherit'}}><LabelIcon/></ListItemIcon>
                        <ListItemText primary={'Admin'} />
                    </ListItem>
                </a>
            } */}
        </React.Fragment>
    )
}

function generateSideContent(pages,classes) {
    return pages.map((page, index) => {
        return (
            <a href={page.href} className= {classes.link} key={page.title}>
                <ListItem button style={{color:colorOfLinks}}>
                    <ListItemIcon style={{color:'inherit'}}>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.title} />
                </ListItem>
            </a>
        )
    })
}

const notLoggedInLinks = [
    {
        title: 'Login',
        icon: <LockOpenIcon/>,
        href:'/login'

    }
]

const extraContentePages = [
    // {
    //     title:'Date Source - NOAA',
    //     icon: <LinkIcon/>,
    //     href:'https://storms.ngs.noaa.gov/'
    // },
    // {
    //     title:'Date Source - USGS',
    //     icon: <LinkIcon/>,
    //     href:'https://coastal.er.usgs.gov/hurricanes/tools/oblique.php'
    // },

]

const styles = theme => ({
    link: {
        textDecoration: 'none',
        color:'inherit',
        margin: theme.spacing(1),
    },
    toolbar: theme.mixins.toolbar,
    // containerLogout:{
    //     display:'flex',
    //     flexDirection:'column',
    //     justifyContent:'space-between',
    //     //backgroundColor:'red',
    //     height:'calc(100%)'
    // }
});


export default withStyles(styles)(DrawerContent);