import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors/';
import theme from '../theme';
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
                
                {/* Impact type */}
                <CheckboxButton
                    //howManyReq = {1}
                    states = {state}
                    label = "Impact Type (pick 1 or more)"
                    labelColor = {theme.palette.secondary.main}
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

                {/* Terrian type */}
                <CheckboxButton
                    //howManyReq = {1}
                    states = {state}
                    label = "Terrian Type (pick 1 or more)"
                    labelColor = {theme.palette.secondary.main}
                    buttons = {[
                        {
                            control:
                                <ColoredBox 
                                    value = "0" 
                                    checked={state.terrianType.sandyCoastline} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{sandyCoastline:!state.terrianType.sandyCoastline}})
                                    }}
                                    // name="sandyCoastline" 
                                    // eventtype = "terrian"
                                />,
                            label:"Sandy Coastline"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "1" 
                                    checked={state.terrianType.marsh} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{marsh:!state.terrianType.marsh}})
                                    }}
                                    // name="marsh" 
                                    // eventtype = "terrian"
                                />,
                            label:"Marsh"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "1" 
                                    checked={state.terrianType.inland} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{inland:!state.terrianType.inland}})
                                    }}
                                    // name="inland" 
                                    // eventtype = "terrian"
                                />,
                            label:"Inland"
                        }
                        ,{
                            control:
                                <ColoredBox 
                                    value = "1" 
                                    checked={state.terrianType.river} 
                                    onChange = {(event) => {
                                        updateFunction({key:'terrianType',value:{river:!state.terrianType.river}})
                                    }}
                                    // name="river" 
                                    // eventtype = "terrian"
                                />,
                            label:"River"
                        }
                    
                    ]}
                />

                {/* <CheckboxButton
                    //howManyReq = {1}
                    states = {state}
                    label = "Sand type" //Display text
                    labelColor = {colors.amber[500]}
                    buttons = {[ //These are the buttons, we will have 3
                        {
                            control:
                                <ColoredBox 
                                    value = "0" 
                                    checked={state.sandType.rough} //Has to match what we put in initialTagState.js
                                    onChange = {(event) => {
                                        //Keys here have to match
                                        updateFunction({key:'sandType',value:{rough:!state.sandType.rough}})
                                    }}
                                />,
                            label:"Rough"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "0" 
                                    checked={state.sandType.coarse} //Has to match what we put in initialTagState.js
                                    onChange = {(event) => {
                                        //Keys here have to match
                                        updateFunction({key:'sandType',value:{coarse:!state.sandType.coarse}})
                                    }}
                                />,
                            label:"Coarse"
                        },
                        {
                            control:
                                <ColoredBox 
                                    value = "0" 
                                    checked={state.sandType.getsEverywhere} //Has to match what we put in initialTagState.js
                                    onChange = {(event) => {
                                        //Keys here have to match
                                        updateFunction({key:'sandType',value:{getsEverywhere:!state.sandType.getsEverywhere}})
                                    }}
                                />,
                            label:"Gets everywhere"
                        },
                    ]}
                /> */}
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
