//Custom checkbox button

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox'

import * as colors from '@material-ui/core/colors/';


const useStyles = makeStyles((theme) => ({
    root: {
      //display: 'flex',
      //color:'red'
    },
    formControl: {
      display: 'flex',
      //margin: theme.spacing(3),
    },
}));

export default function CheckboxButton(props) {
    const classes = useStyles();
    // const error = Object.keys(props.states).filter((element) => props.states[element]).length < props.howManyReq;

    return (
      <div className={classes.root}>
        <FormControl required  component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{props.label}</FormLabel>
          <FormGroup>

            <div className = {classes.formControl}>
              {props.buttons.map(button => (
                  <FormControlLabel
                    key = {button.label}
                    
                    {...button}
                  />  

              ))}
            </div>
           
          </FormGroup>
            {/* {error && <FormHelperText>Please select atleast {props.howManyReq} options</FormHelperText>} */}
        </FormControl>
      </div>
    );
}

