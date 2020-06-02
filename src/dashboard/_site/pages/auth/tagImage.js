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

  // console.log(imageDocument?.id)
  const imgUrl = endpoints.showImage(imageDocument?.id)

  async function skipImage() {
    const responseData = await (await fetch(apiCall(
      endpoints.skipImage(queryParams?.archive)
      ), {
      method: "GET",
    
    })).json();
    
    alert(responseData?.message ? responseData?.message : 'No message')
    Router.reload()
  }

  const taggingForm = (
    <React.Fragment>
      <TaggingForm
        imageUrl = {`${apiCall(imgUrl)}`}
        submitTags = {submitTags}
        tagAsWater = {tagAsWater}
        skipImage = {skipImage}
        imageDoc = {imageDocument}
        queryParams = {queryParams}
      />
    </React.Fragment>
  )

  async function submitTags(tags) {
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

  //Make sure both query params sent
  if(!query.archive || !query.catalog) {
    return ({
      error:true,
      errorTitle:'Invalid query params',
      errorMessage:`Please send a valid catalog and archive in URL params.`
    })
  }

  //Is this user part of this archive
  const getQueryCatalogName = await (await fetch(apiCall(
    endpoints.getCatalogByName(query.catalog)
    ), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //These two are needed for server side calls
      "credentials": "include",
      "cookie": ctx?.req?.headers?.cookie ?? null 
    }
  })).json();
  const catalogId = getQueryCatalogName.data[0]?._id

  //If the Catalog passed is invalid
  if(!catalogId) {
    return {
      error:true,
      errorTitle:'Invalid Catalog name',
      errorMessage:`Catalog name of ${query.catalog} is an invalid Catalog name`
    }
  }

  //Compare the ID's of the Catalogs a user is part of and the ID of this Catalogs
  const catalogsOfUser = req?.user?.mongoUser?.catalogs ?? []
  if(!(catalogsOfUser.includes(catalogId))) {
    return ({
      error:true,
      errorTitle:'Not allowed to tag',
      errorMessage:`User is not allowed to tag Catalog ${query.catalog}`
    })
  }

  //Then get the image of the user
  const getImageOfArchive = await (await fetch(apiCall(
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
  // console.log('@@@@@@@@@@@@@@@',getImageOfArchive)
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