// This file asks the user the values of the tag for an image

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { red, blue } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

import tagStateReducer from './tagStateReducer'
import initalTagState from './initalTagState'
import getSteps from './getSteps'
import getAllowNextStepVar from './getAllowNextStepVar'
import getStepContent from './getStepContent'

export default function ImageTagStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  //For the image
  const [expanded, setExpanded] = React.useState(false);
  const [tagState, updateTagState] = React.useReducer(tagStateReducer, initalTagState);
  
  const imagePath = props.imagePath || '/stormImages/storm1.jpg'

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  getAllowNextStepVar.tagState = tagState

  const allowNextStep = getAllowNextStepVar()
  
  getStepContent.tagState = tagState
  getStepContent.updateTagState = updateTagState
  getStepContent.handleCheckboxChange

  const handleChange = (event,fnc) => {
    alert(event.target.value)
    fnc(event.target.value);
  };

  //What happens when we click next
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  //What happens when we click back
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  //What happens when we click rest
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      {activeStep}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        
        {/* Allows to hide image */}
        <CardActions disableSpacing style={{backgroundColor:'grey'}}>
                
            <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon  className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })} />
            <Typography>{expanded? 'Close image':'Open image'}</Typography>
            
            </IconButton>
        </CardActions>
        
        {/* The image */}
        <CardActionArea 
            onClick = {() => {
                window.open( imagePath, imagePath); 
            }}
        >   
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardMedia
                    component="img"
                    alt="No image found"
                                   
                    image={imagePath}
                    title="Image to tag"
                />
            </Collapse>
        </CardActionArea>

        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Here is the tag information that will be sent</Typography>
            <Typography className={classes.instructions}>
                {
                  Object.keys(tagState).map((value,index) =>{
                  return (<div>{value}:{JSON.stringify(tagState[value])}</div>)
                  })
                }
            </Typography>
            <div className={classes.controllerButtons}> 
              <Button
                color="secondary" 
                onClick={handleReset}
                className={classes.backButton}
              >
                  Reset
              </Button>

              <Button 
                variant="contained" 
                color="primary"  
                onClick={() => {
                  props.submitTag(tagState)
                }}
              >
                Submit
              </Button>
            </div>
            
          </div>
        ) : (
          <div >
            <Paper className={classes.instructions2} style={{backgroundColor:'#424242'}}>
                    {getStepContent(activeStep)} 
            </Paper>
            <div className={classes.controllerButtons}> 
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                  Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={getAllowNextStepVar()[activeStep] == -1}>
                  {activeStep === steps.length - 1 ? 'Review' : 'Next'}
              </Button>
            </div>   
          </div>
        )}
      </div>
      {JSON.stringify(tagState)}
      <br/>
      {/* {JSON.stringify(stateX)} */}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),

  },
  instructions: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingLeft:theme.spacing(2)
  },
  instructions2: {
    // paddingTop: theme.spacing(4),
    // marginBottom: theme.spacing(2),
    // paddingLeft:theme.spacing(4)
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  controllerButtons: {
    paddingTop: theme.spacing(1),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'left',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  buttons: {
    // display: 'flex',
    // flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      //padding: theme.spacing(2),
    //   width: theme.spacing(16),
    //   height: theme.spacing(16),
    },
  },
  skipButtonColor: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  waterButtonColor: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  }
}));

