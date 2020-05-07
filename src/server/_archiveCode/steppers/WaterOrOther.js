import { makeStyles } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import handleWaterImage from './handleWaterImage'
// import  handleSkipImage from './handleSkipImage'

export default function WaterOrOtherQuestions(props) {
    let {waterFnc,skipFnc} = props.functions
    const classes = useStyles();
    return (
      <div className = {classes.buttons}>
        <div>
          <Button variant="contained" color="primary" className = {classes.waterButtonColor} onClick={waterFnc} >
            Water Image
          </Button>
          <Typography>
            Click the above button if the current image on display is just an 
            image of water or mostly water and thus contains no useful information.
          </Typography>
        </div>

        <div>
        <Button variant="contained" color="secondary" className = {classes.skipButtonColor} onClick={skipFnc}>
          Skip Image
        </Button>
          <Typography>
            Click the above button if you do not wish to tag the 
            current image and we will give you another one.
          </Typography>
        </div>
        
        
      </div>
    )
}

const useStyles = makeStyles(theme => ({
    buttons: {
      // display: 'flex',
      // flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        //padding: theme.spacing(2),
      //   width: theme.spacing(16),
      //   height: theme.spacing(16),
      },
    },
    skipButtonColor: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
    waterButtonColor: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
      '&:hover': {
        backgroundColor: blue[700],
      },
    }
  }));