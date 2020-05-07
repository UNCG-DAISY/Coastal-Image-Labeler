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
                    //howManyReq = {1}
                    states = {state}
                    label = "Impact Type, pick zero or more"
                    labelColor = {colors.teal[500]}
                    buttons = {[
                        {
                            control:
                                <ColoredBox 
                                    value = "0" 
                                    checked={state.impactType.swash == true ? true : false} 
                                    onChange = {(event) => {
                                        updateFunction({key:'impactType',value:{swash:!state.impactType.swash}})
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
                                    checked={state.impactType.collision == 1} 
                                    onChange = {(event) => {
                                        updateFunction({key:'impactType',value:{collision:!state.impactType.collision}})
                                    }}
                                    name="collision" 
                                    eventtype = "impact"
                                />,
                            label:"collision"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "2" 
                                    checked={state.impactType.overwash == 1} 
                                    onChange = {(event) => {
                                        updateFunction({key:'impactType',value:{overwash:!state.impactType.overwash}})
                                    }}
                                    name="overwash" 
                                    eventtype = "impact"
                                />,
                            label:"overwash"
                            },
                            {
                            control:
                                <ColoredBox 
                                    value = "3" 
                                    checked={state.impactType.inundation == 1} 
                                    onChange = {(event) => {
                                        updateFunction({key:'impactType',value:{inundation:!state.impactType.inundation}})
                                    }}
                                    name="inundation" 
                                    eventtype = "impact"
                                />,
                            label:"inundation"
                            }
                    
                    ]}
                />

                <CheckboxButton
                    //howManyReq = {1}
                    states = {state}
                    label = "Impact Type, pick zero or more"
                    labelColor = {colors.amber[500]}
                    buttons = {[
                        {
                            control:
                                <ColoredBox 
                                    value = "0" 
                                    checked={state.terrianType.sandyCoastline == 1} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{sandyCoastline:!state.terrianType.sandyCoastline}})
                                    }}
                                    name="sandyCoastline" 
                                    eventtype = "terrian"
                                />,
                            label:"Sandy Coastline"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "1" 
                                    checked={state.terrianType.marsh == 1} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{marsh:!state.terrianType.marsh}})
                                    }}
                                    name="marsh" 
                                    eventtype = "terrian"
                                />,
                            label:"Marsh"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "1" 
                                    checked={state.terrianType.inland == 1} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{inland:!state.terrianType.inland}})
                                    }}
                                    name="inland" 
                                    eventtype = "terrian"
                                />,
                            label:"Inland"
                        }
                        ,{
                            control:
                                <ColoredBox 
                                    value = "1" 
                                    checked={state.terrianType.river == 1} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{river:!state.terrianType.river}})
                                    }}
                                    name="river" 
                                    eventtype = "terrian"
                                />,
                            label:"River"
                        }
                    
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
