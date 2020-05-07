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
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
}));

export default function CustomCheckboxButton(props) {

    // console.log('state',props.state)
    // console.log('buttons',props.buttons)

    const classes = useStyles();

   
    //const { gilad, jason, antoine } = props.state;
    //const {onChange:handleChange} = props

    // Object.keys(props.states).forEach(element => {
        
    // });
    const error = Object.keys(props.states).filter((element) => props.states[element]).length < props.howManyReq;
    //const error = false
    return (
      <div className={classes.root}>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{props.label}</FormLabel>
          <FormGroup>
           
            {props.buttons.map(button => (
                <FormControlLabel
                key = {button.label}
                {...button}
                />  

            ))}
          </FormGroup>
            {error && <FormHelperText>Please select atleast {props.howManyReq} options</FormHelperText>}
        </FormControl>
      </div>
    );
}

