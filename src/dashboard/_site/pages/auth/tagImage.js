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
    allowedPages
  } = props
  const classes = useStyles();
  //amenadiel/a420/420_test.png

  
  const imgUrl = `${queryParams?.storm}/${queryParams?.archive}/${imageDocument?.id}`

  async function skipImage() {
    //alert('Skipping image')
    const responseData = await (await fetch(apiCall(
      endpoints.skipImage(queryParams?.archive)
      //`/api/v1/images/skipImage/${queryParams?.archive}`
      ), {
      method: "GET",
    
    })).json();
    
    alert(responseData?.message ? responseData?.message : 'No message')
    Router.reload()
  }

  const taggingForm = (
    <React.Fragment>
      <TaggingForm
        imageUrl = {`${apiCall(imgUrl)}`} //http://localhost:5000/${imgUrl}
        submitTags = {submitTags}
        tagAsWater = {tagAsWater}
        skipImage = {skipImage}
        imageDoc = {imageDocument}
        queryParams = {queryParams}
      />
      
      {/* <Button variant="contained" onClick={()=>submitTags(5)}>Default</Button> */}
    </React.Fragment>
  )

  async function submitTags(tags) {
    //alert(`You are about to tag to image ${imageDocument._id}`)

    const payload = {
      _id : imageDocument?._id,
      tags: tags,
      timeEnd:Date.now(),
      timeStart: props.timeStart
    }

    const responseData = await (await fetch(apiCall(
      endpoints.tagImage
      //`/api/v1/images/tagImage`
      ), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(payload)
    })).json();

    alert(responseData?.message ? responseData?.message : 'No message')

    console.log(responseData)
    Router.reload()
    
  }

  function tagAsWater() {
    let tag = initalTagState
    tag.water = 1
    submitTags(tag)
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
        {/* {JSON.stringify(queryParams)} */}
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

  //things to check

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

  //Is both query params sent
  if(!query.archive || !query.storm) {
    return ({
      error:true,
      errorTitle:'Invalid query params',
      errorMessage:`Please send a valid storm and archive in URL params.`
    })
  }

  //Is this user part of this archive
  const getQueryStormName = await (await fetch(apiCall(
    //`/api/v1/storms?name=${query.storm}`
    endpoints.getStormByName(query.storm)
    ), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //These two are needed for server side calls
      "credentials": "include",
      "cookie": ctx?.req?.headers?.cookie ?? null 
    }
  })).json();
  const stormID = getQueryStormName.data[0]?._id

  //If the storm passed is invalid
  if(!stormID) {
    return {
      error:true,
      errorTitle:'Invalid Storm name',
      errorMessage:`Storm name of ${query.storm} is an invalid storm name`
    }
  }

  //Compare the ID's of the storms a user is part of and the ID of this storm
  const stormsOfUser = req.user.mongoUser.storms
  if(!(stormsOfUser.includes(stormID))) {
    return ({
      error:true,
      errorTitle:'Not allowed to tag',
      errorMessage:`User is not allowed to tag storm ${query.storm}`
    })
  }

  //Then get the image of the user
  const getImageOfArchive = await (await fetch(apiCall(
    //`/api/v1/users/getImage/${query.archive}`
    endpoints.getImage(query.archive)
    ), {
    method: "GET",
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
      errorTitle:'Invalid Archive',
      errorMessage:`Archive ${query.archive} is a invalid archive name`
    })
  }
  const imageDocument = getImageOfArchive?.data?.image
  
  return {
    error:false,
    query,
    allowedPages,
    imageDocument:imageDocument,
    //cookie:ctx?.req?.headers?.cookie ?? null ,
    timeStart:Date.now()
  }
}

export default TagImage