import React from 'react';
import CustomCheckboxButton from './customCheckbox'
import * as colors from '@material-ui/core/colors/';
import Checkbox from '@material-ui/core/Checkbox'


export default function TerrianCheckbox(props) {

    const {states,howManyReq,handleChange} = props

    return (
        <CustomCheckboxButton
            howManyReq = {howManyReq}
            states = {states}
            label = "Terrian Type"
            buttons = {[
                {
                control:
                    <Checkbox 
                    value = "0" 
                    checked={states.swash == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="swash" 
                    eventType = "terrian"
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
                    eventType = "terrian"
                    />,
                label:"collision"
                }

            ]}
        />
    )
}