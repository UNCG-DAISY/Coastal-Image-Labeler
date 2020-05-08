import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as colors from '@material-ui/core/colors/';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import RadioButtonQuestions from './RadioButtonQuestions'
import CheckboxQuestions from './CheckboxQuestions'

export default class ClassificationQuestions extends React.Component {
    
    render() {
       
        return (
            <React.Fragment>
                <CardContent>
                    {/* {JSON.stringify(this.state)} */}
                    <Typography variant="h5" color="textSecondary" component="p">
                        Image Classification Categories
                    </Typography>
                    <Divider style={{marginBottom:20}}/>
                    <RadioButtonQuestions
                        state = {
                            this.props.tags
                        }
                        updateFunction = {this.props.updateRadio}
                    />
                    <Divider style={{marginBottom:20}}/>

                    <CheckboxQuestions
                        state = {
                            this.props.tags
                        }
                        updateFunction = {this.props.updateCheckbox}
                    />

                    <Divider style={{marginBottom:20}}/>
                    <AdditionalCommentsTextfield
                        id="additionalComments"
                        label="Additional Comments"
                        defaultValue=""
                        //helperText="Not required"
                        variant="outlined"
                        onChange= {(event)=> this.props.updateComment(event.target.value)}
                    />
                </CardContent>
            </React.Fragment>
        )
    }
}


const AdditionalCommentsTextfield = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'red',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: colors.green[500],
        },
        '&:hover fieldset': {
          borderColor: colors.green[900],
        },
        '&.Mui-focused fieldset': {
          borderColor: colors.green[500],
        },
      },
    },
})(TextField);