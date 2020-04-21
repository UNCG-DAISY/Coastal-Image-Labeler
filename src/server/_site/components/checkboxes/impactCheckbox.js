import React from 'react';
import CustomCheckboxButton from './customCheckbox'
import * as colors from '@material-ui/core/colors/';
import Checkbox from '@material-ui/core/Checkbox'


export default function ImpactCheckbox(props) {

    const {states,howManyReq,handleChange} = props

   

    return (
        <CustomCheckboxButton
            howManyReq = {howManyReq}
            states = {states}
            label = "Impact Type"
            buttons = {[
                {
                control:
                    <Checkbox 
                    value = "0" 
                    checked={states.swash == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="swash" 
                    eventtype = "impact"
                    />,
                label:"swash"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.collision == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="collision" 
                    eventtype = "impact"
                    />,
                label:"collision"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.overwash == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="overwash" 
                    eventtype = "impact"
                    />,
                label:"overwash"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.inundation == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="inundation" 
                    eventtype = "impact"
                    />,
                label:"inundation"
                }

            ]}
        />
    )
}