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
            buttons = {[
                {
                control:
                    <Checkbox 
                    value = "0" 
                    checked={states.waterImpact} 
                    onChange={handleChange} 
                    name="waterImpact" 
                    eventType = "impact"
                    />,
                label:"Water Impact"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.windImpact} 
                    onChange={handleChange} 
                    name="windImpact" 
                    eventType = "impact"
                    />,
                label:"Wind Impact"
                }

            ]}
        />
    )
}