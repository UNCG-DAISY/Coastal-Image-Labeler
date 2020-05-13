import Radio from '@material-ui/core/Radio';
import * as colors from '@material-ui/core/colors/';
import Divider from '@material-ui/core/Divider';
import theme from '../theme';
import RadioButtonGroup from '../radio/RadioButtonGroup'
import { withStyles } from '@material-ui/core/styles';

export default class RadioButtonQuestions extends React.Component {
    render() {
        const {
            state,
            updateFunction
        } = this.props
        return (
            <React.Fragment>

                {/* Development Type */}
                <RadioButtonGroup
                    onChange={updateFunction}
                    style={{color:theme.palette.secondary.main}}
                    title={`Development Type`}
                    keyValue={'devType'}
                    state={state.devType}
                    buttons={[
                        {
                            value:"0",
                            control: <RedRadio/>,
                            label: "Undeveloped",
                            labelPlacement:"end"
                        },
                        {
                            value:'1',
                            control: <GreenRadio />,
                            label: "Developed",
                            labelPlacement:"end"
                        }
                    ]}
                />

                {/* Washover Type */}
                <RadioButtonGroup
                    onChange={updateFunction}
                    style={{color:theme.palette.secondary.main}}
                    title={`Washover Type`}
                    keyValue={'washoverType'}
                    state={state.washoverType}
                    buttons={[
                        {
                            value:'0',
                            control: <RedRadio/>,
                            label: "No Visible Washover",
                            labelPlacement:"end"
                        },
                        {
                            value:'1',
                            control: <GreenRadio/>,
                            label: "Visible Washover",
                            labelPlacement:"end"
                        }
                    ]}
                />

                {/* Damage Type */}
                <RadioButtonGroup
                    onChange={updateFunction}
                    style={{color:theme.palette.secondary.main}}
                    title={`Damage Type`}
                    keyValue={'damageType'}
                    state={state.damageType}
                    buttons={[
                        {
                            value:'0',
                            control: <RedRadio/>,
                            label: "No Visible Damage To Infrastructure",
                            labelPlacement:"end"
                        },
                        {
                            value:'1',
                            control: <GreenRadio/>,
                            label: "Visible Damage To Infrastructure",
                            labelPlacement:"end"
                        }
                    ]}
                />
                
                {/* Example extension */}
                {/* <RadioButtonGroup
                    onChange={updateFunction}
                    //Pick any color, https://material-ui.com/customization/color/#color
                    style={{color:colors.purple[400]}} //Color of the title
                    title={`Contains Sand`}
                    //has to be the same as the key we set in initalTagState.js 
                    keyValue={'hasSand'} 
                    //has to be the same as the key we set in initalTagState.js 
                    state={state.hasSand}
                    buttons={[
                        {
                            value:"0",//What value does it change hasSand to
                            control: <RedRadio/>,
                            label: "No", //Display text
                            labelPlacement:"end"
                        },
                        {
                            value:'1',//What value does it change hasSand to
                            control: <GreenRadio />,
                            label: "Yes",//Display text
                            labelPlacement:"end"
                        }
                    ]}
                />
   */}
                
            </React.Fragment>
        )
    }
}

const ColorizeButton = (color) => {
    return {
        root: {
            color: color.circle,
            '&$checked': {
                color: color.checked,
            },
        },
        checked: {},
    }
}

const RedRadio = withStyles(ColorizeButton({circle:colors.red[400],checked:colors.red[600]}))(Radio);
const GreenRadio = withStyles(ColorizeButton({circle:colors.green[400],checked:colors.green[600]}))(Radio);