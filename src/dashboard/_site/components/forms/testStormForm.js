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
  FormLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";

export default function TestStormForm() {
    const { register, errors, handleSubmit, control, watch, getValues } = useForm({
        mode: "onChange",
        defaultValues:{
            devType:"",
            additionalComments:"",
            washoverType:"",
            dmgType:"",
            ...impactTypesDefault
        }
    });
    const onSubmit = data => console.log(data);

    console.log()
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                {
                    radioTypes.map((radioType,index) =>{
                        return (
                            <React.Fragment key={`${index}-${radioType.key}`}>
                                <FormLabel component="legend">{radioType.label}</FormLabel>
                                <Controller
                                    as={
                                        <RadioGroup aria-label="Pizza type" style={{display:'flex',flexDirection:'row'}}>
                                            {radioType.value.map((type) => (
                                                <FormControlLabel
                                                    value={type.name}
                                                    control={<Radio />}
                                                    label={type.name}
                                                    key={type.name}
                                                />
                                            ))}
                                        </RadioGroup>
                                    }
                                    name={radioType.key}
                                    control={control}
                                />
                            </React.Fragment>
                        )
                    })
                }

                {
                    checkboxTypes.map((checkboxType,index) =>{
                        return (
                            <React.Fragment key={`${index}-${checkboxType.key}`}>
                                <FormLabel component="legend">{checkboxType.label}</FormLabel>
                                <FormGroup row>
                                   
                                    {checkboxType.value.map((type) => (
                                        <React.Fragment key={type.name}>
                                            <FormControlLabel
                                                control={
                                                    <Controller
                                                        as={<Checkbox />}
                                                        name={type.key}
                                                        type="checkbox"
                                                        control={control}
                                                    />
                                                }
                                                label={type.name}
                                            />
                                        </React.Fragment>
                                    ))}
                                </FormGroup>
                                
                                
                            </React.Fragment>
                        )
                    })
                }

                <TextField
                    label="Additional Comments"
                    fullWidth
                    variant="outlined"
                    type="text"
                    name="additionalComments"
                    error={!!errors.additionalComments}
                    inputRef={register({ required:true })}
                />

                <Button
                    variant="contained"
                    disabled={(!!errors.additionalComments || !getValues().additionalComments)}
                >
                    Submit
                </Button>
                <div>{JSON.stringify(watch())}</div>
            </form>
            
        </React.Fragment>    
    );
}

const devTypes = [
    {
      name: "Undeveloped",
    },
    {
      name: "Developed",
    }
];

const washoverTypes = [
    {
        name:"No visible Washover"
    },
    {
        name:"Visible Washover"
    }
]

const dmgTypes = [
    {
        name:"No visible damage to infrastructure"
    },
    {
        name:"Visible damage to infrastructure"
    }
]

const radioTypes = [
    {
        key:'devType',
        value:devTypes,
        label:'Development Type'
    },
    {
        key:'washoverType',
        value:washoverTypes,
        label:'Washover Type'
    },
    {
        key:'dmgType',
        value:dmgTypes,
        label:'Damage Type'
    }
]

const impactTypes = [
    {
        name:'Swash',
        key:'swash'
    },
    {
        name:'Collision',
        key:'collision'
    },
    {
        name:'Overwash',
        key:'overwash'
    },
    {
        name:'Inundation',
        key:'inundation'
    }
]

let impactTypesDefault = {}
impactTypes.map((type)=>{
    impactTypesDefault[type.key] = false
})
const checkboxTypes = [
    {
        key:'impactType',
        value:impactTypes,
        label:'Impact Types',
        required:1
    }
]