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
import axios from 'axios'
import Layout from '../../components/layouts/Layout'

import ErrorAlert from '../../components/ErrorAlert'

import endpoints from '../../components/endpoints'

// This page shows a stepper that asks a series of questions on what strom to
// tag, what archive of that storm and then redirects to a page to show that
// image

function PickCatalog(props) {
  const {stormList} = props
  const classes = useStyles();

  function determineContent() {
    if(props.error) {
      return <ErrorAlert errorTitle={props.errorTitle} errorMessage={props.errorMessage}/>
    }
  
    if(Object.keys(stormList).length == 0) {
      return (
        <ErrorAlert 
          errorTitle={'No catalogs'} 
          errorMessage={
            'You do not have permissions to tag any catalogs, please contact an admin to get permissions.'
          }
        />
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

PickCatalog.getInitialProps = async ctx => {
  const {req,res} = ctx

  //First make sure theres a user
  hasUser(req)
  
  //get allowed pages
  const allowedPages = await getAllowedPages(req.user,ctx)

  //first check if the user is a tagger
  //if they are not, just return notTagger
  if(allowedPages.tagger === false) {
    return ({
      error:true,
      errorTitle:'Not a tagger',
      errorMessage:`You do not have permissions to tag any archives. Please contact an admin to get permissions.`
    })
  }

  //get the dropdown information
  const selectableCatalogInfo = await (await fetch(apiCall(endpoints.getPickCatalogInfo), { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cookie": ctx.req ? ctx.req?.headers?.cookie ?? null : null
      },
  })).json()
  const stormList = selectableCatalogInfo?.data?.dropdownInfo

  return {
    allowedPages,
    stormList
  }
}

export default PickCatalog