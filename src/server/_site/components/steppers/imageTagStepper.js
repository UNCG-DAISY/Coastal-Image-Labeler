import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as colors from '@material-ui/core/colors/';
import Radio from '@material-ui/core/Radio';

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
}));

function getSteps() {
  return ['Development type', 'Washover visibility', 'Impact type', 'Terrian type(s)'];
}



export default function ImageTagStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

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
        return 'Select washover visibility';
      case 2:
        return 'Select impact type';
      case 2:
        return 'Select terrian type(s)';
      default:
        return 'Unknown stepIndex';
    }
  }

  const [devType,setDevType] = React.useState("-1");
  const [washoverType,setWashoverType] = React.useState("-1");

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
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
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
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
