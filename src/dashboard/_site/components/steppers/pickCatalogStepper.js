// This is the stepper that asks the user what Catalog and archive they wanna tag

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { Alert, AlertTitle } from '@material-ui/lab';

import CreateCatalogPickerDropdown from './createPickCatalogDropdown'
import theme from '../theme'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",

  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display:'flex',
    justifyContent:'center',
  },
  controls: {
    display:'flex',
    justifyContent:'space-around',
    paddingTop:10
  },
}));

function getSteps() {
  return ['Pick a Catalog', 'Pick an Archive from that Catalog'];
}

export default function PickCatalogStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const Router = useRouter()

  const catalogs = props?.catalogs || {}

  const catalogKeys = Object.keys(catalogs)

  const [selectedCatalog, setSelectedCatalog] = React.useState(-1);
  const [selectedArchive, setselectedArchive] = React.useState(-1);

  const handleNext = () => {
      if(activeStep == steps.length-1) {  
        //alert(`Getting image for Catalog ${selectedCatalog} under archive ${selectedArchive}`) 
        window.location.href=`/auth/tagImage?catalog=${selectedCatalog}&archive=${selectedArchive}`
      }
      else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <CreateCatalogPickerDropdown 
                data={catalogs} 
                stateFunctions = {[selectedCatalog, setSelectedCatalog]} 
                defaultValue="Please select an Catalog"
                //label = 'Pick a Catalog'
            />
        );
        
      case 1:
        return (
            <CreateCatalogPickerDropdown 
                data={catalogs[selectedCatalog].archives} 
                stateFunctions = {[selectedArchive, setselectedArchive]}
                defaultValue="Please select an Archive"
                //label = 'Pick a Catalog'
            />
        );
     
      default:
        return 'Unknown stepIndex';
    }
  }

  function shouldDisable() {
      if(activeStep == 0) {
          return selectedCatalog ==-1
      }
      if(activeStep == 1) {
        return selectedArchive ==-1
    }
  }

  return (
    <div className={classes.root}>
      {/* {JSON.stringify(catalogs[selectedCatalog])} */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{width:`500px`}}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <React.Fragment>
            <Divider />
                <div className={classes.instructions}>
                  {getStepContent(activeStep)}
                </div>
                {
                  catalogs[selectedCatalog]?
                  <Alert severity="info" color="info" variant="outlined" >
                    <AlertTitle>Info</AlertTitle>
                   
                      <React.Fragment>
                          <div>
                            <strong style={{color:theme.palette.secondary.main}}>Description</strong>: 
                            {catalogs[selectedCatalog]?.info?.description ?? 'N/A'}
                            <Button variant="text" size="small" href={catalogs[selectedCatalog]?.info?.link ?? ''} style={{textDecoration:'none'}} color="secondary">Link to Wikipedia</Button>
                          </div>
                          
                          <br/>
                          <strong style={{color:theme.palette.secondary.main}}>
                            Total Images of Catalog
                          </strong>: {catalogs[selectedCatalog]?.totalImages}

                          {
                            selectedArchive != -1?
                            (
                              <React.Fragment>
                                <br/>
                                <strong style={{color:theme.palette.secondary.main}}>
                                  Total Images of Archive
                                </strong>: {catalogs[selectedCatalog].archives[selectedArchive]?.totalImages}
                              </React.Fragment>
                            )
                            :
                            (
                              <div></div>
                            )
                          }
                    
                          <div>
                            <strong style={{color:theme.palette.secondary.main}}>Year</strong> 
                            : {catalogs[selectedCatalog]?.info?.year ?? 'N/A'}
                          </div>                  
                      </React.Fragment>
                   
                </Alert>:
                <React.Fragment></React.Fragment>
                }
                
 
            <Divider />

            
            <div className={classes.controls}>
           
                
              <center>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} disabled={shouldDisable()}>
                    {activeStep === steps.length - 1 ? 'Get Image' : 'Next'}
                  </Button>
                </div>
              </center>
            
            
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
