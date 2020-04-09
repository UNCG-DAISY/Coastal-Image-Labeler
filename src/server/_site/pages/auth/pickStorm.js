import React from 'react';
import Container from '@material-ui/core/Container';
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import PickStormStepper from '../../components/steppers/pickStormStepper'
import {getAllowedPages} from '../../components/utils/getAllowedPages'
import { 
  apiCall
} from '../../components/constants'
import fetch from "isomorphic-fetch";
import axios from 'axios'

const useStyles = makeStyles(theme  => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      // width: theme.spacing(72),
      // height: theme.spacing(64),
    },
  },
}));

// This page shows a stepper that asks a series of questions on what strom to
// tag, what archive of that storm and then redirects to a page to show that
// image

function TagImage(props) {
  const {storms,stormList} = props
  const classes = useStyles();
  const router = useRouter()

  function submitTags(tags) {
    alert('Tag!')
    console.log(tags)
  }

  return (
    <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer allowedPages={props.allowedPages}/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
      <Container maxWidth="md">
      <div className={classes.paper}>
        <Paper elevation={13} >
          <PickStormStepper storms = {stormList}/>
        </Paper>
        
      </div>
      </Container>
    </Drawer>
    
  );
}

TagImage.getInitialProps = async ctx => {
  const {req,res} = ctx
  
  const {query} = req

  const storms ={
    stormA:{
      A_Arc1: {
        name:'Storm A Archive 1',
        images:[
          'A_Arc1_img1',
          'A_Arc1_img2'
        ],
      },

      A_Arc2: {
        name:'Storm A Archive 2',
        images:[
          'A_Arc2_img1',
          'A_Arc2_img2'
        ],
      },

      A_Arc3: {
        name:'Storm C Archive 3',
        images:[
          'A_Arc3_img1',
          'A_Arc3_img2'
        ],
      },   
    },

    stormB:{
      B_Arc1: {
        name:'Storm B Archive 1',
        images:[
          'B_Arc1_img1',
          'B_Arc1_img2'
        ],
      },

      B_Arc2: {
        name:'Storm B Archive 2',
        images:[
          'B_Arc2_img1',
          'B_Arc2_img2'
        ],
      }

    }
  }

  const allowedPages = await getAllowedPages(req.user,ctx)

  if(allowedPages.tagger === false) {
    res.redirect("/auth/home")
  }

  const getStorms = (await axios.get(
    apiCall(
      `/api/v1/storms/user/${req.user.mongoUser._id}`
    )
  )).data

  let stormList = {}
 
  getStorms.data.forEach(storm => {
      let newEntry = {
      };

      stormList[storm.name] = {}
      
      let archiveList = []
      storm.archives.forEach(archive => {
        stormList[storm.name][archive.name] = {}
      });
  });

  //console.log(stormList)


  return {storms,allowedPages,stormList}
}

export default TagImage