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

import Layout from '../../components/layouts/Layout'
import { useRouter } from 'next/router'

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import axios from 'axios'
import { 
  apiCall
} from '../../components/constants'

import {getAllowedPages} from '../../components/utils/getAllowedPages'
import ResumeTaggingTable from '../../components/ResumeTaggingTable'

import endpoints from '../../components/endpoints'


// Home page after logging in
function Home(props) {
  const router = useRouter()
  async function continueTagging(archive,imageId) {
    const  reqBody ={
      name:archive
    }
    
    //because its buggy rn
    return

    //get storm
    const res = await fetch(apiCall(endpoints.findArchive), { //`/api/v1/archives/FindArchive`
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });

    
    const dataArchive = ((await res.json()).data).archives[0]
    const {storm} = dataArchive
    
    const resGetStorm = await fetch(endpoints.getStormById(storm), { //`/api/v1/storms?_id=${storm}`
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
  } = props?.user?.mongoUser

  const classes = useStyles();

  async function testcall() {
    const res = await (await fetch(apiCall(
        endpoints.allowedPages(props.user.id)
        ), {
        method: "GET",
        "credentials": "include",
        headers: {
            "Content-Type": "application/json",
            "credentials": "include",
            
            //"mycookie": props.cookie ,
        }
    })).json();

    console.log(res)
  }

  //console.log(assignedImages)
  return (
    <Layout user={props.user} pageTitle="Home">
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom color="secondary">
            Welcome!
          </Typography>

          <Typography variant="body1" component="h1" gutterBottom>
            <Paper elevation={3} variant="outlined" style={{padding:10}}>
              Welcome {props.user.displayName}! You can start tagging by clicking on "Image Tag" on the left, or resume an archive you have
              begun by pressing the buttons below
            </Paper>
          </Typography> 

         
          {
            assignedImages?
            <React.Fragment>
              <Typography variant="h6" component="h1" gutterBottom color="secondary" style={{paddingTop:20}}>
                Continue tagging from collections below.
              </Typography>
              {/* <Paper elevation={3} variant="outlined" style={{paddingBottom:10,paddingTop:10}}>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={12}>
                  
                  </Grid>
                </Grid>
              </Paper> */}
              <div className={classes.center}>
                <ResumeTaggingTable archives={assignedImages} onClick={continueTagging}/>
              </div>
               
            </React.Fragment>:
              
            <></>
          }

          
{/* 
          <Button 
            variant="contained" 
            onClick = {() => {   
              testcall()     
            }}
          >
            Test is tagger
          </Button>
           */}
          
    
         
        </Box>
      </Container>
    </Layout>
    
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
  center:{
    display:'flex',
    justifyContent:'center',
    flexDirection:'row'
  }
}));

Home.getInitialProps = async ctx => {
  const {req,res} = ctx

  hasUser(req)
  
  //const allowedPages = {}//await getAllowedPages(req.user,ctx)
  

  return {cookie:ctx.req.headers.cookie}
}

export default Home