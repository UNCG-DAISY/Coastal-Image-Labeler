import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    TextField,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
    FormLabel,
    FormGroup,
    Checkbox,
    Typography,
    makeStyles,
    createStyles,
    IconButton,
    Divider 
} from "@material-ui/core";
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import theme from '../theme';
import {
    WaterButton,
    SkipButton,
    SubmitButton
} from '../buttons/colorizedButtons'
import {
    YesNoRadio
} from '../buttons/radioButtons/radioButtons'
import {
    YesNoCheckbox
}  from '../buttons/checkboxButtons/checkboxButtons'

export default function GenericHookForm(props) {

    const classes = useStyles();

    const [globalDisable, setGlobalDisable] = useState(false);
    const {
        questionSetData,
        formFunctions
    } = props

    const { tagAsWater, skipImage, submitTags} = formFunctions
    const {
        questions 
    } = questionSetData

    const { register, handleSubmit, errors, watch, getValues, control, setValue  } = useForm({
        defaultValues:{
            ...generateRadioDefaults(questions)
        }
    });

    const onSubmit = data => {
        setGlobalDisable(true)
        submitTags(data)
    };

    function generateMinMaxText(min,max) {
        // let minText = ""
        // let maxText = ""
        // let seperator = ""
        // seperator = " - "
        // minText = `Atleast ${min} `
        // if(max) {
        //     seperator = " - "
        //     maxText = `Atmost ${max}`
        // }
        // return `${seperator}${minText}${maxText}`
    }

    function generateTextField(textFieldInfo) {
        const {required,key,multiline,rows} = textFieldInfo
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
                multiline={multiline ?? false}
                rows = {rows ?? 1}
                disabled={globalDisable}
            />
        )
    }

    function generateLabel(label,link) {
        //console.log("link = ",link)
        return (
            <React.Fragment>
                <Typography color="secondary">
                    {label}
                    <a className={classes.link} href={link} target="_blank">
                        <IconButton size="small">
                            <HelpTwoToneIcon />
                        </IconButton>
                    </a>
                </Typography>
                
            </React.Fragment>
        )
    }

    const errorText = (key,errorMessage,label,min,max) =>{
        const text = ( 
            <span style={{color:'red'}}>
                {
                    errorMessage?
                    errorMessage
                    :
                    <React.Fragment>
                        {errors[key] && `Error - ${label} requires`}
                        {` atleast ${min?min:0}`}
                        {max&&min?' and':""}
                        {` ${max?` at most ${max}`:""}`}
                    </React.Fragment>  
                }   
            </span>
        )
        return (
            errors[key] && text
        )
    }

    function generateRadio(radioQuestions) {
        const {
            label,key,required,buttons,errorMessage,docLink
        } = radioQuestions
        //console.log(radioQuestions)
        return (
            <React.Fragment key={key}>
                <FormControl fullWidth component="fieldset" margin="normal">
                    <FormLabel component="legend">{generateLabel(label,docLink)}</FormLabel>
                    <Controller
                        as={
                            <RadioGroup aria-label={key} row>
                                {buttons.map((radioButton) => (
                                    <FormControlLabel
                                        value={radioButton.value}
                                        control={<YesNoRadio color="primary"/>}
                                        label={radioButton.name}
                                        key={radioButton.value}
                                        disabled={globalDisable}
                                    />
                                ))}
                            </RadioGroup>
                        }
                        name={key}
                        control={control}
                        rules={{ required: required }}
                    />
                    {errorText(key,errorMessage,label,1)}
                </FormControl>
                
            </React.Fragment>
        )
    }

    function generateCheckbox(checkboxQuestions) {
        const {
            label,key,required,buttons,min,max,errorMessage,docLink
        } = checkboxQuestions
        return (
            <FormControl fullWidth component="fieldset" margin="normal" key={key}>
                <FormLabel component="legend" focused={false}>
                {generateLabel(label,docLink)} {errorMessage}
                </FormLabel>
                <FormGroup row>
                {
                    buttons.map((checkboxButton)=>(
                        <FormControlLabel
                            key={checkboxButton.value}
                            label={`${checkboxButton.name}`}
                            control={
                                <YesNoCheckbox  
                                    disabled={globalDisable}
                                    color="primary"
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
                            
                        /> 
                    ))
                }
                
                </FormGroup>
                {errorText(key,errorMessage,label,min,max)}
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
            <Typography color="secondary">
                {questionSetData.name}:{questionSetData.description}
            </Typography>
            {/* <Typography>
                {questionSetData.description}
            </Typography> */}
            <Divider/>
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
                        }} 
                    >
                        <div >
                            <SkipButton variant="outlined" onClick = {()=>{setGlobalDisable(true);skipImage()}} disabled={globalDisable}>
                                Skip
                            </SkipButton>

                            <WaterButton variant="outlined" onClick = {()=>{setGlobalDisable(true);tagAsWater()}} style={{marginLeft:theme.spacing(2)}} disabled={globalDisable}>
                            Tag as all water and skip to next image
                            </WaterButton>
                        </div>
                        <div >
                            <SubmitButton type="submit" variant="outlined" color="default" disabled={globalDisable}>
                                Submit
                            </SubmitButton>
                        </div>
                    </div> 
                </FormControl>
                
            </form>
            {/* {JSON.stringify(watch())} */}
        </React.Fragment>
    );
}

// const questions = [
//     {
//         type:'radioGroup',
//         required:true,
//         label:"Development Type",
//         key:"devType",
//         buttons:[
//             {
//                 name: "Undeveloped",
//                 value: "undeveloped" 
//             },
//             {
//                 name: "Developed",
//                 value: "developed"
//             }
//         ]
//     },
//     {
//         type:'radioGroup',
//         required:true,
//         label:"Washover Type",
//         key:"washoverType",
//         buttons:[
//             {
//                 name: "No visible washover",
//                 value: "noWashover" 
//             },
//             {
//                 name: "Visibile washover",
//                 value: "washover"
//             }
//         ]
//     },
//     {
//         type:'radioGroup',
//         required:true,
//         label:"Damage Type",
//         key:"dmgType",
//         buttons:[
//             {
//                 name: "No visible damage to infrastructure",
//                 value: "noDamage" 
//             },
//             {
//                 name: "Visible damage to infrastructure",
//                 value: "damage"
//             }
//         ]
//     },
//     {
//         type:'checkboxGroup',
//         required:true,
//         min:1,
//         label:"Impact Type(s)",
//         key:"impactType",
//         buttons:[
//             {
//                 name: "Swash",
//                 value: "swash" 
//             },
//             {
//                 name: "Collision",
//                 value: "collision"
//             },
//             {
//                 name: "Overwash",
//                 value: "overwash"
//             },
//             {
//                 name: "Inundation",
//                 value: "inundation"
//             }
//         ]
//     },
//     {
//         type:'checkboxGroup',
//         required:true,
//         min:1,
//         label:"Terrian Type(s)",
//         key:"terrianType",
//         buttons:[
//             {
//                 name: "Sandy Coastline",
//                 value: "sandyCoastline" 
//             },
//             {
//                 name: "Marsh",
//                 value: "marsh"
//             },
//             {
//                 name: "Inland",
//                 value: "inland"
//             },
//             {
//                 name: "River",
//                 value: "river"
//             }
//         ]
//     },
//     {
//         type:'textField',
//         required:false,
//         label:"Additional Comments",
//         key:"additionalComments",
//         multiline:true,
//         rows: 5,
//     }
// ]

const useStyles = makeStyles((theme) => createStyles({
    link: {
        textDecoration:'none',
        color:theme.palette.primary.main
    },
}));
  

function generateRadioDefaults(input) {
    let defaults = {}

    input.map((question)=>{
        if(question.type === "radioGroup"){
            defaults[question.key] = ""
        }
    })
    return defaults
}