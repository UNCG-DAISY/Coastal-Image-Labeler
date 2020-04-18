// This file asks the user the values of the tag for an image

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as colors from '@material-ui/core/colors/';
import Radio from '@material-ui/core/Radio';

import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import TagImageCard from '../cards/imageTagCard'
import CustomRadioButton from '../radio/customRadioButton'
import CustomCheckboxButton from '../checkboxes/customCheckbox'
import DevRadio from '../radio/imageTag/devRadio'
import WashoverRadio from '../radio/imageTag/washoverRadio'
import ImpactRadio from '../radio/imageTag/impactRadio'
import DamageRadio from '../radio/imageTag/damageType'
import theme from '../theme'

import { red, blue } from '@material-ui/core/colors';

import Paper from '@material-ui/core/Paper';
// import { func } from 'prop-types';
// import { set } from 'mongoose';

import Checkbox from '@material-ui/core/Checkbox'
import ImpactCheckbox from '../checkboxes/impactCheckbox'

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

const initalTagState = {
  devType: -1,
  washoverType: -1,
  impactType: {
    waterImpact:0,
    windImpact:0
  },
  damageType: -1,
  terrianType: {
    swash:0, 
    collision:0, 
    overwash:0, 
    inundation:0
  },
  waterOrOther: 0,
};

function tagStateReducer(state, action) {
  switch (action.type) {
    case 'updateImpact':
      return {
        ...state,
        impactType: {
          ...state.impactType,
          [action.key]:action.value
        }
      };
    default:
      throw new Error();
  }
}

export default function ImageTagStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [devType,setDevType] = React.useState("-1");
  const [washoverType,setWashoverType] = React.useState("-1");
  const [impactType,setImpactType] = React.useState("-1");
  const [damageType,setDamageType] = React.useState("-1");
  const [terrianType,setTerrianType] = React.useState("0");
  const [waterOrOther,setWaterOrOther] = React.useState("0");
  const [expanded, setExpanded] = React.useState(false);


  const handleCheckboxChange = (event) => {
    //alert(event.target.name)

    const target = event.target

    if(target.eventType = 'impact') {

      updateTagState({
        type:'updateImpact',
        key:event.target.name,
        value: event.target.checked? 1:0
      })
     
    }
   
  };




  const [tagState, updateTagState] = React.useReducer(tagStateReducer, initalTagState);

  const imagePath = props.imagePath || '/stormImages/storm1.jpg'

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function getSteps() {
    return [
        'Water or N/A',
        'Development type', 
        'Washover visibility', 
        'Impact type', 
        'Terrian type(s)',
        'Damage type'
    ];
  }
  function getAllowNextStepVar() {
      return [
        waterOrOther,
        devType,
        washoverType,
        impactType,
        terrianType,
        damageType
      ]
  }
  const allowNextStep = getAllowNextStepVar()
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: 
        return (
          <WaterOrOtherQuestions/>
        )
      case 1:
        return (
            <DevRadio devType = {devType} setDevType={setDevType} handleChange={handleChange}/>          
        );
      case 2:
        return (
            <WashoverRadio washoverType={washoverType} setWashoverType={setWashoverType} handleChange={handleChange}/>      
        )
      case 3:
        return (
            <ImpactRadio impactType={impactType} setImpactType={setImpactType} handleChange={handleChange}/>
        );
      case 4: 
        return (
          'Terrian types'
        )
      case 5: 
        return (
          <DamageRadio damageType={damageType} setDamageType={setDamageType} handleChange={handleChange}/>
        );
    //   case 2:
    //     return 'Select terrian type(s)';
      default:
        return 'Unknown stepIndex';
    }
  }

  function WaterOrOtherQuestions() {
    return (
      <div className = {classes.buttons}>
        <div>
          <Button variant="contained" color="primary" className = {classes.waterButtonColor} onClick={handleWaterImage} >
            Water Image
          </Button>
          <Typography>
            Click the above button if the current image on display is just an 
            image of water or mostly water and thus contains no useful information.
          </Typography>
        </div>

        <div>
        <Button variant="contained" color="secondary" className = {classes.skipButtonColor} onClick={handleSkipImage}>
          Skip Image
        </Button>
          <Typography>
            Click the above button if you do not wish to tag the 
            current image and we will give you another one.
          </Typography>
        </div>
        
        
      </div>
    )
  }

  function handleWaterImage() {
    alert('This is water image');
  }

  function handleSkipImage() {
    alert('image skipped');
  }
 

  const handleChange = (event,fnc) => {
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
                devtype = {devType} <br/>
                wasType = {washoverType} <br/>
                impType = {impactType} <br/>
                dmgType = {damageType}
            </Typography>
            <div className={classes.controllerButtons}> 
              <Button
                color="secondary" onClick={handleReset}
                onClick={handleBack}
                className={classes.backButton}
              >
                  Reset
              </Button>

              <Button 
                variant="contained" 
                color="primary"  
                onClick={() => {
                  props.submitTag({
                    devType,
                    washoverType,
                    impactType,
                    terrianType,
                    damageType
                  })
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
              <Button variant="contained" color="primary" onClick={handleNext} disabled={allowNextStep[activeStep] == -1}>
                  {activeStep === steps.length - 1 ? 'Review' : 'Next'}
              </Button>

              <Button  onClick={() => updateTagState({type: 'updateTerrian', value:69})}>
                  hello
              </Button>

            

              <ImpactCheckbox
                states = {tagState.impactType}
                howManyReq = {1}
                handleChange = {handleCheckboxChange}
              />
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
