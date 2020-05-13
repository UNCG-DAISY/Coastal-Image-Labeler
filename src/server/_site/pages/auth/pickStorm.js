import React from 'react';
import Container from '@material-ui/core/Container';
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import PickStormStepper from '../../components/steppers/pickStormStepper'
import {getAllowedPages} from '../../components/utils/getAllowedPages'
import { 
  apiCall
} from '../../components/constants'
import fetch from "isomorphic-fetch";
import axios from 'axios'
import Layout from '../../components/layouts/Layout'
import { Alert, AlertTitle } from '@material-ui/lab';



// This page shows a stepper that asks a series of questions on what strom to
// tag, what archive of that storm and then redirects to a page to show that
// image

function TagImage(props) {
  const {stormList} = props
  const classes = useStyles();

  function submitTags(tags) {
    alert('Tag!')
    console.log(tags)
  }

  return (
    <Layout user={props.user} pageTitle="Start Tagging">
      <Container maxWidth="md">
      <div className={classes.paper}>
        <Paper elevation={13} >
          {
            props.notTagger?
            <React.Fragment>
              <Alert severity="warning" color="warning"variant="outlined" >
                  <AlertTitle>Not a tagger</AlertTitle>
                  You do not have permissions to tag any archives. Please contact an admin to get permissions.
              </Alert>
            </React.Fragment> :
            <React.Fragment>
              <PickStormStepper storms = {stormList}/>
            </React.Fragment>
          }
          
        </Paper>
        
      </div>
      </Container>
    </Layout>
    
  );
}

const useStyles = makeStyles(theme  => ({
  paper: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      // width: theme.spacing(72),
      // height: theme.spacing(64),
    },
  },
}));

TagImage.getInitialProps = async ctx => {
  const {req,res} = ctx
  
  const {query} = req

  const allowedPages = await getAllowedPages(req.user,ctx)

  if(allowedPages.tagger === false) {
    return {notTagger:true}
  }

  const getStorms = (await axios.get(
    apiCall(
      `/api/v1/storms/user/${req.user.mongoUser._id}`
    )
  )).data

  let stormList = {}
 
  getStorms.data.forEach(storm => {
      

      stormList[storm.name] = {}
     
      stormList[storm.name].info = storm.stormInfo
      let archiveList = []
      storm.archives.forEach(archive => {
        stormList[storm.name].archives= {
          ...stormList[storm.name].archives
        }
        stormList[storm.name].archives[archive.name] = {}
      });
  });

  return {allowedPages,stormList}
}

export default TagImage