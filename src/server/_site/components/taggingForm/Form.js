import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as colors from '@material-ui/core/colors/';

import RadioButton from '../radio/RadioButton'
import Radio from '@material-ui/core/Radio';

import RadioButtonGroup from '../radio/RadioButtonGroup'
export default class Form extends React.Component {
    state = {
        ...this.props.tags
    }
    updateRadio(params){
        this.setState({
            [params.key]:params.value
        })
   
    }

    testfnc = (params) => {
        this.setState({
            [params.key]:params.value
        })
    }
    render() {
        return (
            <CardContent>
                {JSON.stringify(this.state)}
                <Typography variant="h6" color="textSecondary" component="p">
                    Image Classification Categories
                </Typography>
        
                <RadioButtonGroup
                 onChange={this.testfnc}
                 style={{color:colors.green[500]}}
                 title={`Development Type`}
                 keyValue={'devType'}
                 state={this.state.devType}
                 buttons={[
                    {
                        value:"0",
                        control: <Radio color="primary" />,
                        label: "Undeveloped",
                        labelPlacement:"end"
                    },
                    {
                        value:'1',
                        control: <Radio color="primary" />,
                        label: "Developed",
                        labelPlacement:"end"
                    }
                ]}
                />
            </CardContent>
        )
    }
}