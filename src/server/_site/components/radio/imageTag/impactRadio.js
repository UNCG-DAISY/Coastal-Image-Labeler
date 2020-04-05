//Configuration for impact radio

import React from 'react';
import CustomRadioButton from '../customRadioButton'
import * as colors from '@material-ui/core/colors/';
import Radio from '@material-ui/core/Radio';

export default function ImpactRadio(props) {
    return(
        <CustomRadioButton 
            value = {props.impactType} 
            onChange = {(event) => props.handleChange(event,props.setImpactType)}
            style = {{color:colors.blue[500]}}
            title = {`Impact Type = ${props.impactType}`}
            ariaLabel = "impactType" 
            name = "impactType"
            buttons={[
                {
                    value:'0',
                    control: <Radio color="primary" />,
                    label: "Storm",
                    labelPlacement:"end"
                },
                {
                    value:'1',
                    control: <Radio color="primary" />,
                    label: "Collision",
                    labelPlacement:"end"
                },
                {
                    value:'2',
                    control: <Radio color="primary" />,
                    label: "Overwash",
                    labelPlacement:"end"
                },
                {
                    value:'3',
                    control: <Radio color="primary" />,
                    label: "Inundation",
                    labelPlacement:"end"
                }
            ]}
        />
    )
}