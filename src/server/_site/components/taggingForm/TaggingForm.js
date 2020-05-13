import { makeStyles,withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import * as colors from '@material-ui/core/colors/';

import theme from '../theme';
import ImageContainer from './ImageContainer'
import initalTagState from './initalTagState'
import Header from './Header'
import ClassificationQuestions from './ClassificationQuestions'
class TaggingForm extends React.Component {
    state ={
        expanded:false,
        tags:initalTagState
    }

    setExpanded(value) {
        this.setState({expanded:value})
    }

    handleExpandClick = () => {
       this.setExpanded(!this.state.expanded)
    };

    updateTagState = state => {
        this.setState({tags:state})
    }
    
    checkboxHasEnoughSelected(state,req) {
        let numSelected = 0
        Object.keys(state).forEach((value) => {
            if(state[value] == 1) {
                numSelected ++
            }
        })

        return numSelected >= req
    }

    isSubmittable(state) {          
        if(state.tags.devType < 0) return true;
        if(state.tags.washoverType < 0) return true;
        if(state.tags.damageType < 0) return true; 
        //if(!(this.checkboxHasEnoughSelected(state.tags.sandType,3))) return true;
        //if(state.tags.hasSand < 0) return true; 
    
        return false;
    }

    updateRadio = (params) => {
        this.setState({tags:{
            ...this.state.tags,
            [params.key]:params.value
        }})
        
    }

    updateCheckbox = (params) => {
        
        this.setState({tags:{
            ...this.state.tags,
            [params.key]:{
                ...this.state.tags[params.key],
                ...params.value
            }
        }})
    }
    
    updateComment = (value) => {
        this.setState({
            tags:{
                ...this.state.tags,
                comments:value
            }
        })
    }
    render() {
        
        const { 
            classes,
            imageDoc,
            queryParams,
            submitTags,
            tagAsWater,
            skipImage
         } = this.props;

        return (
            <React.Fragment>
                {/* {JSON.stringify(this.state.tags)} */}
                <div className={classes.center}>
                    
                    <Card className={classes.root}>
                        <Header 
                            title={`Storm ${queryParams.storm}`} 
                            subheader={`Archive ${queryParams.archive} - ${imageDoc.id}`}
                            style={{color:theme.palette.primary.light}}
                            styleSubheader = {{color:theme.palette.secondary.main}} 
                        />
                        <ImageContainer
                            classes={classes}
                            state={this.state}
                            imageUrl={this.props.imageUrl}
                            handleExpandClick={this.handleExpandClick}
                           
                        />
                        <ClassificationQuestions 
                            tags={this.state.tags}
                            updateRadio = {this.updateRadio}
                            updateCheckbox = {this.updateCheckbox}
                            updateComment = {this.updateComment}
                        />
                    </Card>
                   
                </div>
                <div style={{marginTop:10,display: 'flex', justifyContent: 'space-between'}} >
                    <div style={{display: 'flex', justifyContent: 'space-between'}} >
                        <SkipButton onClick={() => skipImage()} className = {classes.formControl}>
                            Skip
                        </SkipButton>
                        <WaterButton onClick={() => tagAsWater()} className = {classes.formControl}>
                            Tag as water
                        </WaterButton>
                    </div>
                    <SubmitButton onClick={() => submitTags(this.state.tags)} disabled={this.isSubmittable(this.state)}>
                        Submit 
                    </SubmitButton>
                </div>
            </React.Fragment>
        )
    }
}

const ColorizeButton = (color,theme) => {
    return {
        root: {
            color: theme.palette.getContrastText(color.color),
            backgroundColor: color.background,
            '&:hover': {
                backgroundColor: color.hover,
            },
            '&:disabled': {
                backgroundColor: 'grey',
                color:'#000000'
            },
        },
    }
}

const SkipButton = withStyles((theme) => (
    // ColorizeButton({color:colors.red[400],background:colors.red[600],hover:colors.red[800]},theme)
    ColorizeButton({color:theme.palette.customColors.red,background:theme.palette.customColors.red,hover:colors.red[800]},theme)
))(Button);

const WaterButton = withStyles((theme) => (
    ColorizeButton({
        color:theme.palette.customColors.cyan,
        background:theme.palette.customColors.cyan,
        hover:colors.cyan[800]
    },theme)
))(Button);

const SubmitButton = withStyles((theme) => (
    ColorizeButton({
        color:'#ffffff',
        background:theme.palette.primary.main,
        hover:theme.palette.primary.light
    },theme)
))(Button);



const styles = theme => ({
    center:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:'red'
    },
    
    root: {
        flex:1,
        
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    dropdownStyles: {
        backgroundColor:'rgba(255, 255, 255, 0.08)' //
    },
    formControl: {
        display: 'flex',
        marginRight: theme.spacing(3),
    },
});
export default withStyles(styles)(TaggingForm);