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

// import TagImageCard from '../../components/cards/imageTagCard'
import ImageTagStepper from '../../components/steppers/imageTagStepper'

const useStyles = makeStyles(theme  => ({
  
}));

// This page shows an image to tag

function TagImage(props) {
  const {query:queryParams,imageId,imageDocument,allowedPages} = props
  const classes = useStyles();
  //amenadiel/a420/420_test.png
  const imgUrl = `${queryParams.storm}/${queryParams.archive}/${imageDocument?.id}`
  console.log(imgUrl)

  async function submitTags(tags) {
    alert(`You are about to tag to image ${imageDocument._id}`)

    const payload = {
      _id : imageDocument._id,
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

    
  }

  function tagAsWater() {
    console.log('water',Object.keys(props),imageId)
  }

  function skipImage() {
    console.log('skip',Object.keys(props),imageId)
  }

  
  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer allowedPages={allowedPages}/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
        <Box my={4}>
          {/* <TagImageCard imagePath = "/stormImages/storm1.jpg"/> */}
          {
            imageDocument?.id?
            <React.Fragment>
              <ImageTagStepper 
                submitTag={submitTags} 
                tagAsWater={tagAsWater}
                skipImage={skipImage}
                imagePath = {`http://localhost:5000/${imgUrl}`} //amenadiel/a420/420_test.png
              /> 
              {/* <Button variant="contained" onClick={()=>submitTags(5)}>Default</Button> */}
            </React.Fragment>
            :
            <Typography>
              <Alert severity="error" variant="outlined">
                <AlertTitle > No new images to tag</AlertTitle>
                You have tagged all images in archive  <strong>{queryParams.archive}</strong>. Please select another archive to tag
                or contact admin to determine which archive to tag next.
              </Alert>
              
            </Typography>
          }
          
          
        </Box>
        {/* {JSON.stringify(queryParams)} */}
      </Container>
    </Drawer>
    
  );
}

TagImage.getInitialProps = async ctx => {

  const {req,res} = ctx
  const {query} = req

  const allowedPages = await getAllowedPages(req.user,ctx)
  if(allowedPages.tagger === false) {
    res.redirect("/auth/home")
  }

  //amenadiel
  const responseData = await (await fetch(apiCall(`/api/v1/users/getImage/${query.archive}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "credentials": "include",
      "cookie": ctx?.req?.headers?.cookie ?? null 
    }
  })).json();

  const imageDocument = responseData?.data?.image

  console.log('Message = ',responseData?.message)

  // const test = await (await fetch(apiCall(`/api/v1/test/get`), {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "credentials": "include",
  //     "cookie": ctx?.req?.headers?.cookie ?? null 
  //   }
  // })).json();
  
  return {
    query,
    allowedPages,
    imageId:imageDocument?._id,
    imageDocument:imageDocument,
    cookie:ctx?.req?.headers?.cookie ?? null ,
    timeStart:Date.now()
  }
}

export default TagImage