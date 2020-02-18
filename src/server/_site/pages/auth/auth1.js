import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Test from '../../components/utils/test'
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import axios from 'axios'
import { 
  myIp,
  port,
  protocal,
  apiCall
} from '../../components/constants'

function About(props) {
  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer allowedPages={props.allowedPages}/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            About.js
          </Typography>
          {/* <a href ='/auth/startTagging?title=memed'>
            startTagging
          </a> */}
          {/* <Test user={props.user} /> */}
        </Box>
      </Container>
    </Drawer>
    
  );
}

About.getInitialProps = async ctx => {
  const {req,res} = ctx

  hasUser(req)

  const user = req.user.mongoUser

  let allowedPages ={
    tagger:false,
    stormMaker:false,
    archiveMaker:false
  }

  if(user?._id) {
    const allowedRoles1 = (await axios.post(apiCall(`/api/v1/users/auth/${user?._id}`),{
      allowedRoles:['tagger']
    })).data
  
    const allowedRoles2 = (await axios.post(apiCall(`/api/v1/users/auth/${user?._id}`),{
      allowedRoles:['stormMaker']
    })).data
  
    const allowedRoles3 = (await axios.post(apiCall(`/api/v1/users/auth/${user?._id}`),{
      allowedRoles:['archiveMaker']
    })).data
    
  
    allowedPages.tagger = allowedRoles1.data.allowed
    allowedPages.stormMaker = allowedRoles2.data.allowed
    allowedPages.archiveMaker = allowedRoles3.data.allowed
  }
  

  console.log(allowedPages)

  return {allowedPages}
}

export default About