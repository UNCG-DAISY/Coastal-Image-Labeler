//Custom radio button

import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import * as colors from '@material-ui/core/colors/';

export default function CustomRadioButton(props) {
    return (
        <>
            <FormLabel component="legend" style = {props.style}>
                {props.title}
            </FormLabel>
            <RadioGroup 
                aria-label={props.ariaLabel}
                name={props.name}
                value={props.value}
                onChange={props.onChange} 
                row
            >
                {props.buttons.map(button => (
                  
                         <FormControlLabel
                             key = {button.label}
                            {...button}
                            />  
                  
                    
                ))}
                {/* <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Undeveloped"
                    labelPlacement="end"
                    
                />
                <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Developed"
                    labelPlacement="end"
                /> */}
            </RadioGroup>
        </>
    )
}