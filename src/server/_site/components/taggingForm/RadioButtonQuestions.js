import Radio from '@material-ui/core/Radio';
import * as colors from '@material-ui/core/colors/';
import Divider from '@material-ui/core/Divider';

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
                <RadioButtonGroup
                    onChange={updateFunction}
                    style={{color:colors.purple[400]}}
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

                <RadioButtonGroup
                    onChange={updateFunction}
                    style={{color:colors.blue[500]}}
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

                <RadioButtonGroup
                    onChange={updateFunction}
                    style={{color:colors.orange[500]}}
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