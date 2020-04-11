import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import { makeStyles } from '@material-ui/core/styles';
import {getAllowedPages} from '../../components/utils/getAllowedPages'
import { 
  apiCall
} from '../../components/constants'
import fetch from "isomorphic-fetch";
import axios from 'axios'

import TagImageCard from '../../components/cards/imageTagCard'
import ImageTagStepper from '../../components/steppers/imageTagStepper'

const useStyles = makeStyles(theme  => ({
  
}));

// This page shows an image to tag

function TagImage(props) {
  const {query:queryParams,imageId,imageDocument,allowedPages} = props
  const classes = useStyles();
  //amenadiel/a420/420_test.png
  const imgUrl = `${queryParams.storm}/${queryParams.archive}/${imageDocument.id}`
  console.log(imgUrl)

  async function submitTags(tags) {
    alert(`You are tagging image id = ${imageDocument._id}`)

    const responseData = await (await fetch(apiCall(`/api/v1/users/TEST_nextImage/${query.archive}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "credentials": "include",
        "cookie": ctx?.req?.headers?.cookie ?? null 
      }
    })).json();
    

    alert(responseData.message)
    // await axios.post(
    //   apiCall(
    //     '/api/v1/images/tagImage'
    //   ),
    //   { type: 'water',
    //     imageId: '5e669584b9a86b631c8cc511',
    //     tags:
    //     { 
    //       impactType: tags.impactType,
    //       devType: tags.devType,
    //       washoverType: tags.washoverType,
    //       damageType: tags.damageType 
    //     } 
    //   },
    //   {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //     withCredentials: false,
    //   }
      
    // )
    // '/api/v1/images/tagImage'
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
          <ImageTagStepper 
            submitTag={submitTags} 
            tagAsWater={tagAsWater}
            skipImage={skipImage}
            imagePath = {`http://localhost:5000/${imgUrl}`} //amenadiel/a420/420_test.png
          />
        </Box>
        {JSON.stringify(queryParams)}
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
  
  return {
    query,
    allowedPages,
    imageId:imageDocument._id,
    imageDocument:imageDocument
  }
}

export default TagImage