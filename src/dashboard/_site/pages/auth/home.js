import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {hasUser} from '../../components/utils/checkIfUser'
import fetch from "isomorphic-fetch";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layouts/Layout'
import { useRouter } from 'next/router'
import { 
  apiCall
} from '../../components/constants'
import ResumeTaggingTable from '../../components/ResumeTaggingTable'
import endpoints from '../../components/endpoints'
import {getMongoDBUser} from '../../components/utils/getMongoUser'
import theme from '../../components/theme'
// import TestStormForm from '../../components/forms/testStormForm'
// import TestForm from '../../components/forms/testForm'
// import TestForm2 from '../../components/forms/testForm2'
// import MuiTestForm from '../../components/forms/muiTestForm'
// Home page after logging in
function Home(props) {

  const {
    assignedImages,
  } = props?.user?.mongoUser

  const {
    resumeObj,
    allImagesTagged
  } = props

  const classes = useStyles();

  return (
    <Layout user={props.user} pageTitle="Home">
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom color="secondary">
            Hello There!
          </Typography>

          <Typography variant="body1" component="h1" gutterBottom>
            <Paper elevation={3} variant="outlined" style={{padding:10}}>
              {/* Welcome {props.user.displayName}! You can start tagging by clicking on <u><b>Image Tag</b></u> on the left, or resume an archive you have
              begun by pressing the buttons/rows below */}

              Welcome {props.user.displayName}! If you have permission to tag images, 
              you can start tagging by clicking on <Linky href="/auth/pickCatalog" color={theme.palette.secondary.main}>Image Tag</Linky> on the left, or resume an 
              archive you have begun by pressing the buttons below.
              To request permission to tag images, 
              please contact 
              Evan Goldstein at <Linky color={theme.palette.secondary.main} href="mailto:ebgoldst@uncg.edu">
                ebgoldst@uncg.edu
              </Linky> You can read about 
              the project <Linky color={theme.palette.secondary.main} href="https://github.com/UNCG-DAISY/Coastal-Image-Labeler">here</Linky>.
            </Paper>
          </Typography> 

         
          {
            assignedImages?
            <React.Fragment>
              <Typography variant="h6" component="h1" gutterBottom color="secondary" style={{paddingTop:20}}>
                Continue tagging from collections below.
              </Typography>
              <div className={classes.center}>
                <ResumeTaggingTable resumeObj = {resumeObj} allImages = {allImagesTagged}/>
              </div>
               
            </React.Fragment>:
              
            <React.Fragment>
              <Typography variant="body1" component="h1" gutterBottom>
                <Paper elevation={3} variant="outlined" style={{padding:10}}>
                  No archives to resume tagging from.
                </Paper>
              </Typography>
            </React.Fragment>
          }
          {/* <TestStormForm functions={{skipImage:()=>{},tagAsWater:()=>{},submitTags:()=>{}}}/>    */}
          {/* <MuiTestForm functions={{skipImage:()=>{},tagAsWater:()=>{},submitTags:()=>{}}}/> */}
        </Box>
      </Container>
    </Layout>
    
  );
}

function Linky(props) {
  return (
    <a style={{color:props.color}} href={props.href}>
      {props.children}
    </a>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  center:{
    display:'flex',
    justifyContent:'center',
    flexDirection:'row'
  }
}));

Home.getInitialProps = async ctx => {

  const {req,res} = ctx
  //default value
  let resumeObj = {}
  let allImagesTagged = {}
  //make sure there is a user
  hasUser(req)

  //get MongoDB suer
  const mongoUser = await getMongoDBUser(req.user.id)

  //if not mongoUser was found, error out
  if(mongoUser.error) {
    return {
      cookie:ctx.req.headers.cookie,
      resumeURL:resumeURL
    }
  }
  const assignedImages = mongoUser?.data?.assignedImages

  //Get resume table data
  if(assignedImages) {
    const getUserResumeInfo = await (await fetch(apiCall(endpoints.getUserResumeInfo), { //`/api/v1/archives/FindArchive`
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cookie": ctx.req ? ctx.req.headers.cookie : null
      },
    })).json()
    //console.log('TEST --- ',getUserResumeInfo)
    resumeObj = getUserResumeInfo?.data?.resumeObj
    allImagesTagged = getUserResumeInfo?.data?.allImagesTagged
    // console.log(allImagesTagged)
    // console.log(resumeObj)
  }

  
  return {
    cookie:ctx.req.headers.cookie,
    resumeObj:resumeObj,
    allImagesTagged:allImagesTagged
  }
}

export default Home