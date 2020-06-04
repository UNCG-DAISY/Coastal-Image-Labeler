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
  FormControl,
  Radio,
  makeStyles,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import theme from '../theme';
import CardContent from '@material-ui/core/CardContent';
//import {SkipButton,WaterButton,SubmitButton} from '../buttons/colorizedButtons'

export default function TestStormForm(props) {
    const { register, errors, handleSubmit, control, watch, getValues } = useForm({
        mode: "onChange",
        defaultValues:{
            devType:"",
            additionalComments:"",
            washoverType:"",
            dmgType:"",
            ...impactTypesDefault,
            ...terrianTypesDefault
        },
        //nested: true
    });
    const onSubmit = data => {alert('HI!')}; //submitTags(data)

    const {
        skipImage,
        tagAsWater,
        submitTags
    } = props.functions

    const [value, setValue] = React.useState(undefined);
    const handleChange = (event) => {
        setValue(event.target.value);
      };

    console.log()
    return (
        <React.Fragment>
           
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                    {
                        radioTypes.map((radioType,index) =>{
                            return (
                                <React.Fragment key={`${index}-${radioType.key}`}>
                                    <FormLabel component="legend">{radioType.label}</FormLabel>
                                    <Controller
                                        as={
                                            <RadioGroup aria-label="RadioTypes" style={{display:'flex',flexDirection:'row'}}>
                                                {radioType.value.map((type) => (
                                                    <FormControlLabel 
                                                        value={type.name}
                                                        key={type.name}
                                                        control={<Radio name={radioType.key} />} 
                                                        label={type.name}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        }
                                        name={radioType.key}
                                        control={control}
                                        rules={{ required: radioType.required ?? false }}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                  
                    {
                        checkboxTypes.map((checkboxType,index) =>{
                            return (
                                // <React.Fragment key={`${index}-${checkboxType.key}`}>
                                //     <FormLabel component="legend">{checkboxType.label}</FormLabel>
                                //     <Controller
                                //         as={
                                //             <FormGroup aria-label="RadioTypes" style={{display:'flex',flexDirection:'row'}}>
                                //                 {checkboxType.value.map((type) => (
                                //                     <FormControlLabel 
                                //                         value={type.name}
                                //                         key={type.name}
                                //                         control={<Checkbox name={checkboxType.key} />} 
                                //                         label={type.name}
                                //                     />
                                //                 ))}
                                //             </FormGroup>
                                //         }
                                //         name={checkboxType.key}
                                //         control={control}
                                //         rules={{ required: checkboxType.required ?? false,min:2 }}
                                //     />
                                // </React.Fragment>
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
                   
                   
                   {
                        Object.keys(errors).map(element => {
                            if(!!errors[element]) {
                                return <React.Fragment>{`Error ${element}` }<br/></React.Fragment>
                            } else {
                                return ''
                            }
                        })
                       
                    }



                    <TextField
                        label="Additional Comments"
                        fullWidth
                        variant="outlined"
                        type="text"
                        name="additionalComments"
                        error={!!errors.additionalComments}
                        //inputRef={register({ required:true })}
                    />
                    </CardContent>
                    <div style={{
                            display: 'flex', justifyContent: 'space-between',flexDirection:'row',
                            marginLeft:theme.spacing(2),marginRight:theme.spacing(2),
                            marginBottom:theme.spacing(2)
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
                            <Button
                                variant="contained"
                                //disabled={(!!errors.additionalComments || !getValues().additionalComments)}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </div> 

                    {/* <div>{JSON.stringify(watch())}</div> */}
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
        label:'Development Type',
        //required:true
    },
    {
        key:'washoverType',
        value:washoverTypes,
        label:'Washover Type',
        //required:false
    },
    {
        key:'dmgType',
        value:dmgTypes,
        label:'Damage Type',
        //required:true
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

const terrianTypes = [
    {
        name:'Sandy Coastline',
        key:'sandyCoastline'
    },
    {
        name:'Marsh',
        key:'marsh'
    },
    {
        name:'Inland',
        key:'inland'
    },
    {
        name:'River',
        key:'river'
    }
]

let impactTypesDefault = {}
impactTypes.map((type)=>{
    impactTypesDefault[type.key] = false
})

let terrianTypesDefault = {}
terrianTypes.map((type)=>{
    terrianTypesDefault[type.key] = false
})

const checkboxTypes = [
    {
        key:'impactType',
        value:impactTypes,
        label:'Impact Types',
        required:true
    },
    {
        key:'terrianType',
        value:terrianTypes,
        label:'Terrian Types',
        required:true
    }
]