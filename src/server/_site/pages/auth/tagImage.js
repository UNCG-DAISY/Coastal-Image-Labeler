import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import {getAllowedPages} from '../../components/utils/getAllowedPages'
import { 
  apiCall
} from '../../components/constants'
import fetch from "isomorphic-fetch";
import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab';
import Router from "next/router";

import TaggingForm from '../../components/taggingForm/TaggingForm'
import initalTagState from '../../components/taggingForm/initalTagState'
import Layout from '../../components/layouts/Layout'

const useStyles = makeStyles(theme  => ({
  
}));

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
    const responseData = await (await fetch(`/api/v1/images/skipImage/${queryParams?.archive}`, {
      method: "GET",
    
    })).json();
    
    alert(responseData?.message ? responseData?.message : 'No message')
    Router.reload()
  }

  const taggingForm = (
    <React.Fragment>
      <TaggingForm
        imageUrl = {`http://localhost:5000/${imgUrl}`}
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

    const responseData = await (await fetch(`/api/v1/images/tagImage`, {
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

    //if you are not a tagger
    if(props.notTagger === true) {
      return (
        <Alert severity="warning" color="warning"variant="outlined" >
            <AlertTitle>Not a tagger</AlertTitle>
            You do not have permissions to tag any archives. Please contact an admin to get permissions.
        </Alert>
      )
    }

    //if not all query params have been passed
    if(props.noQueryParams) {
      return (
        <Alert severity="warning" color="warning"variant="outlined" >
            <AlertTitle>No storm/archive given</AlertTitle>
            Please enter a valid URL with a valid storm and archive.
        </Alert>
      )
    }

    //check if allowed to vist this archive

    //if no imageDocs sent
    if(!imageDocument?.id || !imageDocument) {
      return <NoImageToTag/>
    }

    
    return taggingForm
    //return taggingForm
  }

  function NoImageToTag() {
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle > No new images to tag</AlertTitle>
        You have tagged all images in archive  <strong>{queryParams?.archive}</strong>. Please select another archive to tag
        or contact admin to determine which archive to tag next.
      </Alert>
    )
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

TagImage.getInitialProps = async ctx => {

  const {req,res} = ctx
  const {query} = req

  const allowedPages = await getAllowedPages(req.user,ctx)
  const defaultReturn = {
    query:{
      storm:'n/a',
      archive:'n/a'
    }
  }

  if(allowedPages.tagger === false) {
    return {notTagger:true}
  }

  
  if(!query.archive || !query.storm) {
    return {noQueryParams:true}
  }

  //amenadiel
  const responseData = await (await fetch(apiCall(`/api/v1/users/getImage/${query.archive}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //These two are needed for server side calls
      "credentials": "include",
      "cookie": ctx?.req?.headers?.cookie ?? null 
    }
  })).json();
  console.log(responseData)
  const imageDocument = responseData?.data?.image
  
  return {
    query,
    allowedPages,
    imageDocument:imageDocument,
    //cookie:ctx?.req?.headers?.cookie ?? null ,
    timeStart:Date.now()
  }
}

export default TagImage