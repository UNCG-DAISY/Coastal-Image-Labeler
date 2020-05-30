import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "react-hook-form-devtools";
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  FormLabel 
} from "@material-ui/core";

export default function TestForm() {
    const { register, errors, handleSubmit, control, watch, getValues } = useForm(
        {
            mode: "onChange",
            reValidateMode: "onChange",
        }
    );
    
    const classes = useStyles();

    const onSubmit = data => console.log(data);

    //console.log(watch()); // watch input value by passing the name of it
    //watch()
    return (
        <React.Fragment>
            <Container>
                {/* <DevTool control={control} /> */}
                <CssBaseline/>
                <Typography variant="h4"> Title </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input name="example" defaultValue="test" ref={register} />
                    
                    <TextField
                        label="Your name"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="name" //default value key name
                        className={classes.textField}
                        error={!!errors.name}
                        inputRef={register({ required: true })} //Need to get the actual ref of the input field
                    />
                    
                    <input type="submit" />
                </form>
                {JSON.stringify(getValues())}
            </Container>

          
        </React.Fragment>
    );
}

const useStyles = makeStyles({
    textField: {
      marginTop: "1em",
    },
    pizzaImage: {
      width: "100%",
    },
});

const devTypes = [
    {
      name: "Undeveloped",
      value: "0",
    },
    {
        name: "Developed",
        value: "1",
    }
];

//  {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
//  <form onSubmit={handleSubmit(onSubmit)}>
//  {/* register your input into the hook by invoking the "register" function */}
//  <input name="example" defaultValue="test" ref={register} />
 
//  {/* include validation with required or other standard HTML validation rules */}
//  <input name="exampleRequired" ref={register({ required: true })} />
//  {/* errors will return when field validation fails  */}
//  {errors.exampleRequired && <span>This field is required</span>}
 
//  <input type="submit" />
// </form>