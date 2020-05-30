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
} from "@material-ui/core";

export default function TestForm() {
    const { register, errors, handleSubmit, control, watch, getValues } = useForm(
        {
            mode: "onChange",
            reValidateMode: "onChange",
            defaultValues: {
                name: "Jack",
                phone: "888-867-5309",
                pizza: "Pepperoni",
            },
        }
    );
    
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <Container>
                <DevTool control={control} />
                <CssBaseline/>
                <Typography variant="h4"> Title </Typography>

                <form onSubmit={handleSubmit(()=>{})}>

                    {/* Simple input */}
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

                    {/* Input with regex */}
                    <TextField
                        label="Your phone"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="phone"
                        className={classes.textField}
                        error={!!errors.phone}
                        inputRef={register({ pattern: /^\d\d\d-\d\d\d-\d\d\d\d$/ })}
                    />

                    {/* Radio buttons */}
                    <Grid container>
                        <Grid item xs={3}>
                            <Controller
                            as={
                                <RadioGroup aria-label="Pizza type">
                                    {pizzaTypes.map((pizza) => (
                                        <FormControlLabel
                                            value={pizza.name}
                                            control={<Radio />}
                                            label={pizza.name}
                                            key={pizza.nam}
                                        />
                                    ))}
                                </RadioGroup>
                            }
                            name="pizza"
                            control={control}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            {/* <img
                            src={`/pizzas/${
                                pizzaTypes.find(({ name }) => name === watch("pizza")).image
                            }`}
                            className={classes.pizzaImage}
                            alt={`${watch("pizza")} image`}
                            /> */}
                            <Typography>
                                {`${watch("pizza")} image`}
                            </Typography>
                        </Grid>
                    </Grid>


                    {/* submit */}
                    <Button
                        variant="contained"
                        disabled={!!errors.name || !!errors.phone}
                        className={classes.textField}
                    >
                    Where's the pizzzzzaaaahhhh!
                    </Button>
                    <div>{JSON.stringify(getValues())}</div>
                </form>
            </Container>

            <form>

            </form>
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

const pizzaTypes = [
    {
      name: "Alfredo",
      image: "alfredo.png",
    },
    {
      name: "BBQ Pork",
      image: "bbq_pork.png",
    },
    {
      name: "Beef",
      image: "beef.png",
    },
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