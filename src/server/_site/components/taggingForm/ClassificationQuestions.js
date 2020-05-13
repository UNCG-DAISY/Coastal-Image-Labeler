import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as colors from '@material-ui/core/colors/';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import theme from '../theme';

import RadioButtonQuestions from './RadioButtonQuestions'
import CheckboxQuestions from './CheckboxQuestions'

export default class ClassificationQuestions extends React.Component {
    
    render() {
       
        return (
            <React.Fragment>
                <CardContent>
                    {/* {JSON.stringify(this.state)} */}
                    <Typography variant="h5" color="textSecondary" component="p" style={{color:'#7D9B43'}}>
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
                        TextField
                        id="additionalComments"
                        label="Additional Comments"
                        defaultValue=""
                        multiline
                        rows={5}
                        size='small'
                        //helperText="Not required"
                        variant="outlined"
                        style={{width:'100%'}}
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
          borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
    },
})(TextField);