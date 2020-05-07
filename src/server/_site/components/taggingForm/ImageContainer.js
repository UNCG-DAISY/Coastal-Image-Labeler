import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import * as colors from '@material-ui/core/colors/';
import { makeStyles,withStyles  } from '@material-ui/core/styles';

export default class ImageContainer extends React.Component{
    render() {
        const  {
            classes,
            state,
            imageUrl,
            handleExpandClick
        } = this.props
        return (
            <React.Fragment>
                <CardActions disableSpacing className={classes.dropdownStyles}>
                    <ViewFullImage color="primary" variant="outlined" style={{marginRight:10}}>View compressed image</ViewFullImage>
                    <ViewCompressedImage color="secondary" variant="outlined">View full image</ViewCompressedImage>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: state.expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={state.expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={state.expanded} timeout="auto" unmountOnExit>
                    {/* <CardContent>  
                    </CardContent> */}
                    <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        title="Paella dish"
                    />
                </Collapse>
            </React.Fragment>
        )
    }
}

const ColorizeButton = (color,theme) => {
    return {
        root: {
            color: (color.color),
            borderColor: color.background,
            '&:hover': {
                borderColor: color.background,
                color:theme.palette.getContrastText(color.color),
                backgroundColor: color.hover,
            },
        },
    }
}
const ViewFullImage = withStyles((theme) => (
    ColorizeButton({color:colors.orange[600],background:colors.orange[600],hover:colors.orange[800]},theme)
))(Button);

const ViewCompressedImage = withStyles((theme) => (
    ColorizeButton({color:colors.yellow[600],background:colors.yellow[600],hover:colors.yellow[800]},theme)
))(Button);