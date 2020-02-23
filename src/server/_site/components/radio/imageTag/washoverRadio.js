import React from 'react';
import CustomRadioButton from '../customRadioButton'
import * as colors from '@material-ui/core/colors/';
import Radio from '@material-ui/core/Radio';

export default function WashoverRadio(props) {
    return(
        <CustomRadioButton 
            value = {props.washoverType} 
            onChange = {(event) => props.handleChange(event,props.setWashoverType)}
            style = {{color:colors.amber[500]}}
            title = {`Washover Type = ${props.washoverType}`}
            ariaLabel = "washoverType" 
            name = "washoverType"
            buttons={[
                {
                    value:'0',
                    control: <Radio color="primary" />,
                    label: "Visible Washover",
                    labelPlacement:"end"
                },
                {
                    value:'1',
                    control: <Radio color="primary" />,
                    label: "No Washover",
                    labelPlacement:"end"
                }
            ]}
        />
    )
}