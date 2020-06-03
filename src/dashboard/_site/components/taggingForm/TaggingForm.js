import { makeStyles,withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';

import theme from '../theme';
import ImageContainer from './ImageContainer'
import initalTagState from './initalTagState'
import Header from './Header'
import ClassificationQuestions from './ClassificationQuestions'
import MuiTestForm from '../forms/muiTestForm'
import CardContent from '@material-ui/core/CardContent';


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
                            subheader={`Archive ${queryParams.archive} - ${imageDoc?.id}`}
                            style={{color:theme.palette.primary.light}}
                            styleSubheader = {{color:theme.palette.secondary.main}} 
                        />
                        <ImageContainer
                            classes={classes}
                            state={this.state}
                            imageUrl={this.props.imageUrl}
                            handleExpandClick={this.handleExpandClick}
                           
                        />
                        <CardContent>
                        <MuiTestForm functions={{
                            skipImage:skipImage,
                            tagAsWater:tagAsWater,
                            submitTags:submitTags
                        }}/>
                        </CardContent>
                    </Card>
                   
                </div>
                {/* <div style={{marginTop:10,display: 'flex', justifyContent: 'space-between'}} >
                    <div style={{display: 'flex', justifyContent: 'space-between'}} >
                        <SkipButton onClick={() => skipImage()} className = {classes.formControl}>
                            Skip
                        </SkipButton>
                        <WaterButton onClick={() => tagAsWater()} className = {classes.formControl}>
                            Tag as all water and skip to next image
                        </WaterButton>
                    </div>
                   
                   
                </div> */}
            </React.Fragment>
        )
    }
}



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