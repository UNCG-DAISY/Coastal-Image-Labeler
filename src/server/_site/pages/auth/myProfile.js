import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box';
import Test from '../../components/utils/test'
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'

import Moment from 'react-moment';
import 'moment-timezone';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345*1.5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function genRoleNames(roles) {
  return roles.map((role, index) => {
      return (
          <>{role.name}</>
      )
  })
}

function MyProfile(props) {
  const classes = useStyles();
  const user = props.user
  const mongoUser = user?.mongoUser[0]
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer/> }AppBar = {<MyAppBar pageTitle = 'My Profile'/>}>

      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar alt="Remy Sharp" src={user.picture} />
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={user.displayName}
          subheader={<Moment format="MM/DD/YYYY">{user.mongoUser[0].dateAdded}</Moment>}
        />
        <CardMedia
          className={classes.media}
          image={user.picture}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Wowe! You are a PSI image tagger. Click below for more information.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Profile Information:</Typography>
            <Typography paragraph>
            Id: {user.id} <br/>
            DisplayName: {user.displayName}<br/>
            Email: {(user.emails[0].value)}<br/>
            </Typography>
           
            <Typography paragraph>
              MongoDB Profile
            </Typography>
            <Typography paragraph>
              {console.log(user.mongoUser[0])}
              Number of images tagged: {mongoUser.numberOfImagesTagged}<br/>
              Roles: {genRoleNames(mongoUser.roleName)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
 
    </Drawer>
    
  );
}


MyProfile.getInitialProps = async ctx => {
  const {req,res} = ctx

  hasUser(req)
  
  return {}
}

export default MyProfile