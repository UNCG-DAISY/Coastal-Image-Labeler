// Stepper that asks a series of questions to tag an image

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateStormPickerDropdown(props) {
    const classes = useStyles();
    const dataValues = Object.keys(props.data)
    
    const [selectedValue, setselectedValue] = props.stateFunctions

    
    //Cool effect that places label in the outline
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return(
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              {props.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedValue}
              onChange={(e)=>{setselectedValue(e.target.value)}}
              labelWidth={labelWidth}
            >
              <MenuItem value='-1'>Please select a value</MenuItem>
              {
                dataValues.map((value,index)=>{
                  return(
                    <MenuItem value={value} key={value} >{value}</MenuItem>
           
                  )
                })
              }
            </Select>  
        </FormControl>
        
    )
}