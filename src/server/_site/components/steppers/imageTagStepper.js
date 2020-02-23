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
import DevRadio from '../radio/imageTag/devRadio'
import WashoverRadio from '../radio/imageTag/washoverRadio'
import ImpactRadio from '../radio/imageTag/impactRadio'
import theme from '../theme'

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
    paddingTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    paddingLeft:theme.spacing(4)
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
}));

export default function ImageTagStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [devType,setDevType] = React.useState("-1");
  const [washoverType,setWashoverType] = React.useState("-1");
  const [impactType,setImpactType] = React.useState("-1");
  const [terrianType,setTerrianType] = React.useState("-1");
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function getSteps() {
    return [
        'Development type', 
        'Washover visibility', 
        'Impact type', 
        //'Terrian type(s)'
    ];
  }
  function getAllowNextStepVar() {
      return [
        devType,
        washoverType,
        impactType,
        //terrianType
      ]
  }
  const allowNextStep = getAllowNextStepVar()
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <DevRadio devType = {devType} setDevType={setDevType} handleChange={handleChange}/>          
        );
      case 1:
        return (
            <WashoverRadio washoverType={washoverType} setWashoverType={setWashoverType} handleChange={handleChange}/>      
        )
      case 2:
        return (
            <ImpactRadio impactType={impactType} setImpactType={setImpactType} handleChange={handleChange}/>
        );
    //   case 2:
    //     return 'Select terrian type(s)';
      default:
        return 'Unknown stepIndex';
    }
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
            </IconButton>
        </CardActions>
        
        {/* The image */}
        <CardActionArea 
            onClick = {() => {
                window.open( "/stormImages/storm1.jpg", "/stormImages/storm1.jpg"); 
            }}
        >
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardMedia
                    component="img"
                    alt="No image found"
                                   
                    image={"/stormImages/storm1.jpg"}
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
                impType = {impactType}
            </Typography>
            <Button variant="contained" color="danger" onClick={handleReset} style={{backgroundColor:'red'}}>
                Reset
            </Button>
            <Button variant="contained" color="primary"  onClick={() => {props.submitTag({devType,washoverType,impactType})}}>
               Submit
            </Button>
          </div>
        ) : (
          <div>
            <CardActionArea className={classes.instructions2}style={{backgroundColor:'#424242'}}>
                    {getStepContent(activeStep)} 
            </CardActionArea>
          
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
       
          </div>
        )}
      </div>
    </div>
  );
}
