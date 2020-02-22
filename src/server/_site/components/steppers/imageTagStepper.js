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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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




export default function ImageTagStepper() {
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
            <CustomRadioButton 
                value = {devType} 
                onChange = {(event) => handleChange(event,setDevType)}
                style = {{color:colors.amber[500]}}
                title = {`Development Type = ${devType}`}
                ariaLabel = "devType" 
                name = "devType"
                buttons={[
                    {
                        value:'0',
                        control: <Radio color="primary" />,
                        label: "Undeveloped",
                        labelPlacement:"end"
                    },
                    {
                        value:'1',
                        control: <Radio color="primary" />,
                        label: "Developed",
                        labelPlacement:"end"
                    }
                ]}
            />
        );
      case 1:
        return (
            <CustomRadioButton 
                value = {washoverType} 
                onChange = {(event) => handleChange(event,setWashoverType)}
                style = {{color:colors.amber[500]}}
                title = {`Washover Type = ${washoverType}`}
                ariaLabel = "washoverType" 
                name = "washoverType"
                buttons={[
                    {
                        value:'0',
                        control: <Radio color="primary" />,
                        label: "Visible Washover",
                        labelPlacement:"end"
                    },
                    {
                        value:'1',
                        control: <Radio color="primary" />,
                        label: "No Washover",
                        labelPlacement:"end"
                    }
                ]}
            />
        )
      case 2:
        return (
            <CustomRadioButton 
                value = {impactType} 
                onChange = {(event) => handleChange(event,setImpactType)}
                style = {{color:colors.amber[500]}}
                title = {`Impact Type = ${impactType}`}
                ariaLabel = "impactType" 
                name = "impactType"
                buttons={[
                    {
                        value:'0',
                        control: <Radio color="primary" />,
                        label: "Storm",
                        labelPlacement:"end"
                    },
                    {
                        value:'1',
                        control: <Radio color="primary" />,
                        label: "Collision",
                        labelPlacement:"end"
                    },
                    {
                        value:'2',
                        control: <Radio color="primary" />,
                        label: "Overwash",
                        labelPlacement:"end"
                    },
                    {
                        value:'3',
                        control: <Radio color="primary" />,
                        label: "Inundation",
                        labelPlacement:"end"
                    }
                ]}
            />
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
      devtype = {devType}
      wasType = {washoverType}
      impType = {impactType}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <CardActions disableSpacing>
                
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
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
                
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={allowNextStep[activeStep] == -1}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
