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
// import TestStormForm from '../../components/forms/testStormForm'
// import TestForm from '../../components/forms/testForm'

// Home page after logging in
function Home(props) {
  const router = useRouter()
  console.log('--------HOME',Object.keys(props))
  const {
    userMessage,
    assignedImages,
  } = props?.user?.mongoUser
  const {
    resumeURL
  } = props
  const classes = useStyles();

  async function testcall() {
    const res = await (await fetch(apiCall(
        endpoints.allowedPages(props.user.id)
        ), {
        method: "GET",
        "credentials": "include",
        headers: {
            "Content-Type": "application/json",
            "credentials": "include",
            
            //"mycookie": props.cookie ,
        }
    })).json();

    console.log(res)
  }

  //console.log(assignedImages)
  return (
    <Layout user={props.user} pageTitle="Home">
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom color="secondary">
            Welcome!
          </Typography>

          <Typography variant="body1" component="h1" gutterBottom>
            <Paper elevation={3} variant="outlined" style={{padding:10}}>
              Welcome {props.user.displayName}! You can start tagging by clicking on <u><b>Image Tag</b></u> on the left, or resume an archive you have
              begun by pressing the buttons/rows below
            </Paper>
          </Typography> 

         
          {
            assignedImages?
            <React.Fragment>
              <Typography variant="h6" component="h1" gutterBottom color="secondary" style={{paddingTop:20}}>
                Continue tagging from collections below.
              </Typography>
              <div className={classes.center}>
                <ResumeTaggingTable resumeURL = {resumeURL}/>
              </div>
               
            </React.Fragment>:
              
            <></>
          }
          {/* <TestStormForm/> */}
          
{/* 
          <Button 
            variant="contained" 
            onClick = {() => {   
              testcall()     
            }}
          >
            Test is tagger
          </Button>
           */}
          
    
         
        </Box>
      </Container>
    </Layout>
    
  );
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
  console.log('=== home get init')
  const {req,res} = ctx
  let resumeURL = {
  }

  hasUser(req)
  console.log('=== got user')
  console.log('=== ',Object.keys(req.user))
  console.log(req.user.id,req.user.user_id)

  const mongoUser = await getMongoDBUser(req.user.id)

  //if not mongoUser was found, error out
  if(mongoUser.error) {
    return {
      cookie:ctx.req.headers.cookie,
      resumeURL:resumeURL
    }
  }
  const assignedImages = mongoUser.data.assignedImages
  

  console.log('=== assigned images', assignedImages)
  if(assignedImages) {
    await Promise.all(Object.keys(assignedImages).map(async (key) => {

      const archiveName = key
      const imageId = assignedImages[archiveName]

      //get storm
      const getArchive = await (await fetch(apiCall(endpoints.findArchive), { //`/api/v1/archives/FindArchive`
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name:archiveName
        })
      })).json()
      const catalogId = getArchive.data.archives[0].catalog

      const getStorm = await (await fetch(apiCall(endpoints.getStormById(catalogId)), { //`/api/v1/storms?_id=${storm}`
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        //body: JSON.stringify(reqBody)
      })).json();
      const catalogName = getStorm.data[0].name


      const urlString = `/auth/tagImage?storm=${catalogName}&archive=${archiveName}`
      
      resumeURL[archiveName] = urlString
      
    }))
  }
  console.log('=== resumeURL',resumeURL)
  //const allowedPages = {}//await getAllowedPages(req.user,ctx)
  

  return {
    cookie:ctx.req.headers.cookie,
    resumeURL:resumeURL
  }
}

export default Home