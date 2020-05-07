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
            label = "Terrian Type, pick any, none required"
            buttons = {[
                {
                control:
                    <Checkbox 
                    value = "0" 
                    checked={states.sandyCoastline == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="sandyCoastline" 
                    eventtype = "terrian"
                    />,
                label:"Sandy Coastline"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.marsh == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="marsh" 
                    eventtype = "terrian"
                    />,
                label:"Marsh"
                },
                {
                    control:
                        <Checkbox 
                        value = "1" 
                        checked={states.inland == 1} 
                        onChange={(event)=>handleChange(event,props.eventType)} 
                        name="inland" 
                        eventtype = "terrian"
                        />,
                    label:"Inland"
                }
                ,{
                    control:
                        <Checkbox 
                        value = "1" 
                        checked={states.river == 1} 
                        onChange={(event)=>handleChange(event,props.eventType)} 
                        name="river" 
                        eventtype = "terrian"
                        />,
                    label:"River"
                }

            ]}
        />
    )
}