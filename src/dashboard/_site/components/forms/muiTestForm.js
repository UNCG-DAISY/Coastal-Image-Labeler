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

    function generateRadio(radioQuestions) {
        const {
            label,key,required,buttons
        } = radioQuestions
        return (
            <React.Fragment key={key}>
                <FormControl fullWidth component="fieldset" margin="normal">
                    <FormLabel component="legend">{label}</FormLabel>
                    <Controller
                        as={
                            <RadioGroup aria-label={key} row>
                                {buttons.map((radioButton) => (
                                    <FormControlLabel
                                        value={radioButton.value}
                                        control={<Radio />}
                                        label={radioButton.name}
                                        key={radioButton.value}
                                    />
                                ))}
                            </RadioGroup>
                        }
                        name={key}
                        control={control}
                        rules={{ required: required }}
                    />
                </FormControl>
                {errors[key] && `Error - ${key}`}
            </React.Fragment>
        )
    }

    function generateCheckbox(checkboxQuestions) {
        const {
            label,key,required,buttons,min,max
        } = checkboxQuestions
        return (
            <FormControl fullWidth component="fieldset" margin="normal">
                <FormLabel component="legend" focused={false}>
                    {label}
                </FormLabel>
                <FormGroup row>
                {
                    buttons.map((checkboxButton)=>(
                        <FormControlLabel
                            key={checkboxButton.value}
                            control={
                                <Checkbox  
                                    name={key} 
                                    value={checkboxButton.value}
                                    inputProps={{ 
                                        ref:register({
                                            required: required,
                                            validate:value=>{
                                                // //console.log( value,getValues().myCheckbox.length)
                                                // const lengthVal = getValues().myCheckbox.length
                                                // return (
                                                //     (lengthVal>=2 && lengthVal<=3) ? true:false
                                                // )
                                                let valid = true;
                                                if(min) {
                                                    valid = valid && getValues()[key].length >= min
                                                }
                                                if(max) {
                                                    valid = valid && getValues()[key].length <= max
                                                }
                                                return valid
                                            }
                                        }) 

                                    }}
                                />
                            }
                            label={checkboxButton.name}
                        /> 
                    ))
                }
                
                </FormGroup>
                {errors[key] && `Error - ${key}`}
            </FormControl>
        )
    }

    function determineQuestionType(questionList) {
        return questionList.map((question)=>{
            switch (question.type) {
                case "radioGroup":
                    return generateRadio(question)
                    break;
                case "checkboxGroup":
                    return generateCheckbox(question)
                    break;
            
                default:
                    break;
            }
        })
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>  
                    <React.Fragment>
                        {/* <FormControl fullWidth component="fieldset" margin="normal">
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
                        </FormControl> */}
                        {determineQuestionType(questions)}
                    </React.Fragment>
                    <br/>
                    {/* {errors.myRadios && "Error myRadios"} */}
                </div>
                <div>
                    {/* {generateCheckbox(questions[3])} */}
                    {/* <FormControl fullWidth component="fieldset" margin="normal">
                        <FormLabel component="legend" focused={false}>
                            Material UI Checkboxes
                        </FormLabel>
                        <FormGroup row>
                        {
                            ["MuiC1","MuiC2","MuiC3","MuiC4"].map((element)=>(
                                <FormControlLabel
                                    key={element}
                                    control={
                                        <Checkbox  
                                            name="myCheckbox" 
                                            value={element}
                                            inputProps={{ 
                                                ref:register({
                                                    required: true,
                                                    validate:value=>{
                                                        //console.log( value,getValues().myCheckbox.length)
                                                        const lengthVal = getValues().myCheckbox.length
                                                        return (
                                                            (lengthVal>=2 && lengthVal<=3) ? true:false
                                                        )
                                                    }
                                                }) 

                                            }}
                                        />
                                    }
                                    label={element}
                                /> 
                            ))
                        }
                        </FormGroup>
                    </FormControl>
                    {errors.myCheckbox && "Error myCheckbox"} */}
                </div>

                <br/>
                <input type="submit" />
            </form>
            {JSON.stringify(watch())}
        </React.Fragment>
    );
}

const questions = [
    {
        type:'radioGroup',
        required:true,
        label:"Development Type",
        key:"devType",
        buttons:[
            {
                name: "Undeveloped",
                value: "undeveloped" 
            },
            {
                name: "Developed",
                value: "developed"
            }
        ]
    },
    {
        type:'radioGroup',
        required:true,
        label:"Washover Type",
        key:"washoverType",
        buttons:[
            {
                name: "No visible washover",
                value: "noWashover" 
            },
            {
                name: "Visibile washover",
                value: "washover"
            }
        ]
    },
    {
        type:'radioGroup',
        required:true,
        label:"Damage Type",
        key:"dmgType",
        buttons:[
            {
                name: "No visible damage to infrastructure",
                value: "noDamage" 
            },
            {
                name: "Visible damage to infrastructure",
                value: "damage"
            }
        ]
    },
    {
        type:'checkboxGroup',
        required:true,
        min:2,
        max:3,
        label:"Impact Type(s)",
        key:"impactType",
        buttons:[
            {
                name: "Swash",
                value: "swash" 
            },
            {
                name: "Collision",
                value: "collision"
            },
            {
                name: "Overwash",
                value: "overwash"
            },
            {
                name: "Inundation",
                value: "inundation"
            }
        ]
    }
]