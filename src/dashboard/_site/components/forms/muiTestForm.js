import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    TextField,
    Container,
    CssBaseline,
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
    makeStyles,
    FormLabel,
    FormGroup,
    Checkbox,
} from "@material-ui/core";
import theme from '../theme';
import CardContent from '@material-ui/core/CardContent';

export default function MuiTestForm() {
    const { register, handleSubmit, errors, watch, getValues, control, setValue  } = useForm({
        // defaultValues:{
        //     myRadios:""
        // }
    });
    const onSubmit = data => {
        console.log('submit',data)
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* <div>  
                    <React.Fragment>
                        <FormLabel component="legend">BIG TEST</FormLabel>
                        <Controller
                            as={
                                <RadioGroup aria-label="Pizza type" row>
                                    {["MuiR1","MuiR2","MuiR3"].map((pizza) => (
                                        <FormControlLabel
                                            value={pizza}
                                            control={<Radio />}
                                            label={pizza}
                                            key={pizza}
                                        />
                                    ))}
                                </RadioGroup>
                            }
                            name="myRadios"
                            control={control}
                            rules={{ required: true }}
                        />
                    </React.Fragment>
                    <br/>
                    {errors.myRadios && "Error myRadios"}
                </div> */}
                <div>
                    <FormControl fullWidth component="fieldset" margin="normal">
                        <FormLabel component="legend" focused={false}>
                            Material UI Checkboxes
                        </FormLabel>

                        {
                            ["MuiC1","MuiC2"].map((element)=>(
                                <FormControlLabel
                                key={element}
                                    control={
                                        <Checkbox  
                                            name="myCheckbox" 
                                            value={element}
                                            inputProps={{ ref:register({required: true,min:2}) }}
                                        />
                                    }
                                    label="Secondary"
                                /> 
                            ))
                        }
                        {/* <FormControlLabel
                            // control={["Muic1","MuiC2","MuiC3","MuiC4"].map((element) => (
                            //     <Checkbox 
                            //         key={element}
                            //         name="myCheckbox" 
                            //         value={element}
                            //         inputProps={{ ref:register({required: true,min:2}) }}
                            //     />
                            // ))}
                            control={
                                <div>
                                    <Checkbox 
                                    key={'element'}
                                    name="myCheckbox" 
                                    value={'element'}
                                    inputProps={{ ref:register({required: true,min:2}) }}
                                />
                                <Checkbox 
                                    key={'element2'}
                                    name="myCheckbox" 
                                    value={'element'}
                                    inputProps={{ ref:register({required: true,min:2}) }}
                                />
                                </div>
                            }
                                
                               
                            
                            label="Secondary"
                        /> */}
                    </FormControl>
                </div>

                <div>
                    <input 
                        type="checkbox" placeholder="myCheckbox" 
                        name="myCheckbox" value="C1" 
                        ref={
                            register({
                                // required: true,
                                // validate:value=>{
                                //     //console.log( value,getValues().myCheckbox.length)
                                //     const lengthVal = getValues().myCheckbox.length
                                //     return (
                                //        (lengthVal>=2 && lengthVal<=3) ? true:false
                                //     )
                                // }
                            })
                        } 
                    />
                    <label>C1</label>
                    <input type="checkbox" placeholder="myCheckbox" name="myCheckbox" value="C2" ref={register({required: true,min:2})} />
                    <label>C2</label>
                    <input type="checkbox" placeholder="myCheckbox" name="myCheckbox" value="C3" ref={register({required: true,min:2})} />
                    <label>C3</label>
                    <input type="checkbox" placeholder="myCheckbox" name="myCheckbox" value="C4" ref={register({required: true,min:2})} />
                    <label>C4</label>
                    <br/>
                    {errors.myCheckbox && "Error myCheckbox"}
                </div>

                <br/>
                <input type="submit" />
            </form>
            {JSON.stringify(watch())}
        </React.Fragment>
    );
}


