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
  apiCall
} from '../../components/constants'

import {getAllowedPages} from '../../components/utils/getAllowedPages'

async function test() {
 
  await fetch("/api/v1/test/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
}


// Home page after logging in
function Home(props) {
  //console.log(props.allowedPages)
  // if(props.allowedPages === undefined) {
  //   console.log('aaaa')
  //   window.location('/home')
  // }
  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer allowedPages={props.allowedPages}/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Home.js
          </Typography>
          {/* <Button variant="contained" color="primary" onClick={test}>
            Primary
          </Button> */}
        </Box>
      </Container>
    </Drawer>
    
  );
}

Home.getInitialProps = async ctx => {
  const {req,res} = ctx

  hasUser(req)

  
  const user = req.user.mongoUser
  
  //console.log(Object.keys(req.user)) // no mongo user on first render
  const allowedPages = await getAllowedPages(req.user,ctx)
  //console.log(allowedPages, 'getinitprop')

  // const test = await fetch(apiCall("/api/v1/test/post"), {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "credentials": "include",
  //     "cookie": ctx.req ? ctx.req.headers.cookie : null ,
  //   },
  //   body:JSON.stringify({
  //     message:'hi'
  //   })
  // });

  return {allowedPages}
}

export default Home