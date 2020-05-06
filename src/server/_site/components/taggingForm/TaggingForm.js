import { makeStyles,withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import ImageContainer from './ImageContainer'
import initalTagState from './initalTagState'
import Header from './Header'
import Form from './Form'
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
        const { classes } = this.props;
        console.log(classes)
        return (
            <React.Fragment>
                <div className={classes.center}>

                    <Card className={classes.root}>
                        <Header title="Storm name" subheader="Archive name - Image name"/>
                        <ImageContainer
                             classes={classes}
                             state={this.state}
                             imageUrl={this.props.imageUrl}
                             handleExpandClick={this.handleExpandClick}
                        />
                        <Form tags={this.state.tags}/>
                    </Card>
                </div>
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
    }
});
export default withStyles(styles)(TaggingForm);