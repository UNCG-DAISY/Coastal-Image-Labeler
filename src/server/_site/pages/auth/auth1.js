import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Test from '../../components/utils/test'
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'

function About(props) {
  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            About.js
          </Typography>
          <Test user={props.user} />
        </Box>
      </Container>
    </Drawer>
    
  );
}

About.getInitialProps = async ctx => {
  const {req,res} = ctx

  hasUser(req)
 
  return {}
}

export default About