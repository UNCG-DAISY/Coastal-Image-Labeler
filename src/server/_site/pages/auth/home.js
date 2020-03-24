import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Test from '../../components/utils/test'
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import fetch from "isomorphic-fetch";

import Button from '@material-ui/core/Button';

import axios from 'axios'
import { 
  myIp,
  port,
  protocal,
  apiCall
} from '../../components/constants'

async function test() {
 
  await fetch("/api/v1/test/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
}


// Home page after logging in
function About(props) {
  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer allowedPages={props.allowedPages}/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Home.js
          </Typography>
          <Button variant="contained" color="primary" onClick={test}>
            Primary
          </Button>
        </Box>
      </Container>
    </Drawer>
    
  );
}

About.getInitialProps = async ctx => {
  const {req,res} = ctx

  hasUser(req)

  //console.log(req.user)
  const user = req.user.mongoUser

  let allowedPages ={
    tagger:false,
    stormMaker:false,
    archiveMaker:false
  }

  const test = await fetch(apiCall("/api/v1/test/post"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "credentials": "include",
      "cookie": ctx.req ? ctx.req.headers.cookie : null ,
    },
    body:JSON.stringify({
      message:'hi'
    })
  });

  console.log((await test.json()).data.message)

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
  

  //console.log(allowedPages)

  return {allowedPages}
}

export default About