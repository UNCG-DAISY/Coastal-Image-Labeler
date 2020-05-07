import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors/';

import CheckboxButton from '../checkboxes/CheckboxButton'
export default class CheckboxQuestions extends React.Component {
    state = {
        test:0
    }
    render() {
        const {
            state,
            updateFunction
        } = this.props

        return (
            <React.Fragment>
                <CheckboxButton
                    howManyReq = {1}
                    states = {state}
                    label = "Impact Type, pick zero or more"
                    labelColor = {colors.teal[500]}
                    buttons = {[
                        {
                            control:
                                <ColoredBox 
                                    value = "0" 
                                    checked={state.swash == true ? true : false} 
                                    onChange = {(event) => {
                                        updateFunction({key:'impactType',value:{swash:!state.swash}})
                                        //this.setState({test:1})
                                    }}
                                    name="swash" 
                                    eventtype = "impact"
                                />,
                            label:"swash"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "1" 
                                    checked={state.collision == 1} 
                                    //onChange={(event)=>handleChange(event,props.eventType)} 
                                    name="collision" 
                                    eventtype = "impact"
                                />,
                            label:"collision"
                        },
                    
                    ]}
                />
            </React.Fragment>
        )
    }
}

const ColorizeCheckbox = (color) => {
    return {
        root: {
            color: color.box,
            '&$checked': {
                color: color.checked,
            },
        },
        checked: {},
    }
}

const ColoredBox = withStyles(ColorizeCheckbox({box:colors.red[400],checked:colors.green[600]}))(Checkbox);
