import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import { makeStyles } from '@material-ui/core/styles';


import TagImageCard from '../../components/cards/imageTagCard'
import ImageTagStepper from '../../components/steppers/imageTagStepper'
const useStyles = makeStyles(theme  => ({
  
}));

// This page shows an image to tag

function TagImage(props) {
  const {query:queryParams} = props
  const classes = useStyles();

  function submitTags(tags) {
    alert('Tag!')
    console.log(tags)
  }

  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer allowedPages={props.allowedPages}/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
        <Box my={4}>
          {/* <TagImageCard imagePath = "/stormImages/storm1.jpg"/> */}
          <ImageTagStepper submitTag={submitTags}/>
          {JSON.stringify(queryParams)}
        </Box>
      </Container>
    </Drawer>
    
  );
}

TagImage.getInitialProps = async ctx => {

  const {req,res} = ctx
  const {query} = req
  return {query}
}

export default TagImage