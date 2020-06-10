import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {getAllowedPages} from '../../components/utils/getAllowedPages'
import { 
  apiCall
} from '../../components/constants'
import fetch from "isomorphic-fetch";
import Router from "next/router";

import TaggingForm from '../../components/taggingForm/TaggingForm'
import initalTagState from '../../components/taggingForm/initalTagState'
import Layout from '../../components/layouts/Layout'
import Paper from '@material-ui/core/Paper';
import ErrorAlert from '../../components/ErrorAlert'
import endpoints from '../../components/endpoints'

// This page shows an image to tag
function TagImage(props) {
  const {
    query:queryParams,
    imageDocument,
    allowedPages,
    questionSetData
  } = props
  const classes = useStyles();
  //amenadiel/a420/420_test.png

  // console.log(imageDocument?.id)
  const imgUrl = endpoints.showImage(imageDocument?.id)
  const imgUrlCompressed = endpoints.showImage(imageDocument?.id,true)

  const taggingForm = (
    <React.Fragment>
      <TaggingForm
        imageUrl = {{full:`${apiCall(imgUrl)}`,compressed:`${apiCall(imgUrlCompressed)}`}}
        submitTags = {submitTags}
        tagAsWater = {tagAsWater}
        skipImage = {skipImage}
        imageDoc = {imageDocument}
        queryParams = {queryParams}
        questionSetData = {questionSetData}
      />
    </React.Fragment>
  )

  async function submitTags(tags) {
    //alert('Submit tags '+imageDocument?._id)
    //console.log(tags)
    const payload = {
      _id : imageDocument?._id,
      tags: tags,
      timeEnd:Date.now(),
      timeStart: props.timeStart
    }
    console.log(payload)
    console.log(JSON.stringify(payload))
    console.log(endpoints.tagImage)
    const responseData = await (await fetch(apiCall(
      endpoints.tagImage
      ), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(payload)
    })).json();

    //console.log(responseData.status)
    if(responseData.success == false) {
      alert(responseData?.message )
    }
    

    // console.log(responseData)
    Router.reload()
    
  }

  function tagAsWater() {
    submitTags({water:true})
  }

  async function skipImage() {
    //alert('Skip image')
    const responseData = await (await fetch(apiCall(
      endpoints.skipImage(queryParams?.archive)
      ), {
      method: "GET",
    
    })).json();
    
    alert(responseData?.message ? responseData?.message : 'No message')
    Router.reload()
  }
  
  function determineContent() {

    if(props.error) {
      return (
        <div className={classes.paper}>
          <Paper elevation={13} >
            <ErrorAlert errorTitle={props.errorTitle} errorMessage={props.errorMessage}/> 
          </Paper>
        
      </div>
      )
    }

    return taggingForm
  }

  return (
    <Layout user={props.user} pageTitle={`Tagging Session: ${imageDocument?.id}`}>
      <Container maxWidth="md">
        <Box my={0}>  
          {       
            determineContent()
          }
        </Box>
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
  
  //Is this user a tagger?
  if(allowedPages?.tagger === false) {
    return ({
      error:true,
      errorTitle:'Not a tagger',
      errorMessage:`You are not a tagger, please contact admin to get permissions to tag.`
    })
  }

  //Make sure both query params sent
  if(!query.archive || !query.catalog) {
    return ({
      error:true,
      errorTitle:'Invalid query params',
      errorMessage:`Please send a valid catalog and archive in URL params.`
    })
  }

  //Then get the image of the user
  const getImageOfArchive = await (await fetch(apiCall(
    endpoints.getImage(query.archive)
    ), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //These two are needed for server side calls
      "credentials": "include",
      "cookie": ctx?.req?.headers?.cookie ?? null 
    }
  })).json();
  if(!getImageOfArchive.success) {
    return ({
      error:true,
      errorTitle:'Error',
      errorMessage:getImageOfArchive.message
    })
  }
  const imageDocument = getImageOfArchive?.data?.image ?? undefined
  
  //get the catalog questions
  
  const getCatalogQuestion = await (await fetch(apiCall(
    endpoints.getCatalogQuestionSet
    ), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //These two are needed for server side calls
      "credentials": "include",
      "cookie": ctx?.req?.headers?.cookie ?? null ,
      
    },
    body:JSON.stringify({
      catalogName:query.catalog 
    })
  })).json();
  if(!getCatalogQuestion.success) {
    return ({
      error:true,
      errorTitle:'Error',
      errorMessage:getCatalogQuestion.message
    })
  }
  //console.log(getCatalogQuestion.data)

  return {
    error:false,
    query,
    allowedPages,
    imageDocument:imageDocument,
    questionSetData:getCatalogQuestion?.data?.questionSets ?? {},
    timeStart:Date.now()
  }
}

export default TagImage