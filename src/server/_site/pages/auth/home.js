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
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useRouter } from 'next/router'

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  //console.log(Object.keys())
  const router = useRouter()
  async function continueTagging(archive,imageId) {
    const  reqBody ={
      name:archive
    }
    

    //get storm
    const res = await fetch(`/api/v1/archives/FindArchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });

    
    const dataArchive = ((await res.json()).data).archives[0]
    const {storm} = dataArchive
    
    const resGetStorm = await fetch(`/api/v1/storms?_id=${storm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      //body: JSON.stringify(reqBody)
    });
    const dataGetStorm = ((await resGetStorm.json()).data)[0]
    
    location.href = `/auth/tagImage?storm=${dataGetStorm.name}&archive=${dataArchive.name}`
  }

  const {
    userMessage,
    assignedImages
  } = props.user.mongoUser

  const classes = useStyles();

  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer allowedPages={props.allowedPages}/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Home.js
          </Typography>

          <Typography variant="body1" component="h1" gutterBottom>
            <Paper elevation={3} variant="outlined" style={{paddingLeft:10}}>
              {userMessage}
            </Paper>
          </Typography> 

          <Typography variant="h6" component="h1" gutterBottom>
            Continue tagging
          </Typography>

          <Paper elevation={3} variant="outlined" style={{paddingLeft:10,paddingBottom:10,paddingTop:10}}>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="flex-start" spacing={2}>
                  {
                    Object.keys(assignedImages).map((value,index)=>{
                      return (
                        <Grid key={`${index}-${value}`} item>
                          <Button variant="contained" color="primary" onClick ={()=>continueTagging(value,assignedImages[value])}>
                            {value}
                          </Button>
                        </Grid>
                        
                      )
                    })
                  } 
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          

          
          
        </Box>
      </Container>
    </Drawer>
    
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

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