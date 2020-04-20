//Configuration for washover type radio

import React from 'react';
import CustomRadioButton from '../customRadioButton'
import * as colors from '@material-ui/core/colors/';
import Radio from '@material-ui/core/Radio';

export default function DamageRadio(props) {
    return(
        <CustomRadioButton 
            value = {props.damageType} 
            onChange = {(event) => {
                props.update({
                    type:'updateRadio',
                    key:'damageType',
                    value:event.target.value
                })
            }}
            style = {{color:colors.orange[500]}}
            title = {`Damage Type = ${props.damageType}`}
            ariaLabel = "damageType" 
            name = "damageType"
            buttons={[
                {
                    value:'0',
                    control: <Radio color="primary" />,
                    label: "Visible Damage",
                    labelPlacement:"end"
                },
                {
                    value:'1',
                    control: <Radio color="primary" />,
                    label: "No Damage",
                    labelPlacement:"end"
                }
            ]}
        />
    )
}