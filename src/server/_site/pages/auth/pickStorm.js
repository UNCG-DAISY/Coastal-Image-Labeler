import React from 'react';
import Container from '@material-ui/core/Container';
import {hasUser} from '../../components/utils/checkIfUser'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
  const {stormList,notTagger} = props
  const classes = useStyles();

  function submitTags(tags) {
    alert('Tag!')
    console.log(tags)
  }

  function determineContent() {
    if(notTagger == true) {
      return (
        <React.Fragment>
          <Alert severity="warning" color="warning"variant="outlined" >
              <AlertTitle>Not a tagger</AlertTitle>
              You do not have permissions to tag any archives. Please contact an admin to get permissions.
          </Alert>
        </React.Fragment>
      )
    }

    return <PickStormStepper storms = {stormList}/>
  }

  return (
    <Layout user={props.user} pageTitle="Start Tagging">
      <Container maxWidth="md">
      <div className={classes.paper}>
        <Paper elevation={13} >
          {
            determineContent()
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

  //First make sure theres a user
  hasUser(req)
  
  const allowedPages = await getAllowedPages(req.user,ctx)

  //first check if the user is a tagger
  //if they are not, just return notTagger
  if(allowedPages.tagger === false) {
    return {
      notTagger:true
    }
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

  return {
    allowedPages,
    stormList
  }
}

export default TagImage