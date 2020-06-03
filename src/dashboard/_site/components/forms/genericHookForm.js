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

export default function GenericHookForm(props) {

    const { register, handleSubmit, errors, watch, getValues, control, setValue  } = useForm({
        // defaultValues:{
        //     myRadios:""
        // }
    });

    const { tagAsWater, skipImage, submitTags} = props.functions

    const onSubmit = data => {
        submitTags(data)
    };

    const errorText = (key) =>{
        return (
            errors[key] && <span style={{color:'red'}}>{errors[key] && `Error - ${key}`}</span>
        )
    }

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
                {errorText(key)}
            </React.Fragment>
        )
    }

    function generateCheckbox(checkboxQuestions) {
        const {
            label,key,required,buttons,min,max
        } = checkboxQuestions
        return (
            <FormControl fullWidth component="fieldset" margin="normal" key={key}>
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
                {errorText(key)}
            </FormControl>
        )
    }

    function generateTextField(textFieldInfo) {
        const {required,key} = textFieldInfo
        return (
            <TextField
                fullWidth
                type="text"
                name={textFieldInfo.label}
                id="filled-required"
                label={textFieldInfo.label}
                variant="filled"
                inputRef={register({required:required})}
                error={!!errors[key]}
                key={key}
            />
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
                case "textField":
                    return generateTextField(question)
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
                        {determineQuestionType(questions)}
                    </React.Fragment>
                </div>
                <FormControl fullWidth component="fieldset" margin="normal">
                    <div 
                        style={{
                            display: 'flex', justifyContent: 'space-between',flexDirection:'row',
                            // marginLeft:theme.spacing(2),marginRight:theme.spacing(2),
                            //marginBottom:theme.spacing(2)
                        }} 
                    >
                        <div >
                            <Button variant="outlined" onClick = {()=>skipImage()}>
                                Skip
                            </Button>

                            <Button variant="outlined" onClick = {()=>tagAsWater()} style={{marginLeft:theme.spacing(2)}}>
                            Tag as all water and skip to next image
                            </Button>
                        </div>
                        <div >
                            <Button type="submit" variant="outlined" color="default">
                                Submit
                            </Button>
                        </div>
                    </div> 
                </FormControl>
                
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
        min:1,
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
    },
    {
        type:'checkboxGroup',
        required:true,
        min:1,
        label:"Terrian Type(s)",
        key:"terrianType",
        buttons:[
            {
                name: "Sandy Coastline",
                value: "sandyCoastline" 
            },
            {
                name: "Marsh",
                value: "marsh"
            },
            {
                name: "Inland",
                value: "inland"
            },
            {
                name: "River",
                value: "river"
            }
        ]
    },
    {
        type:'textField',
        required:false,
        label:"Additional Comments",
        key:"additionalComments",
    }
]