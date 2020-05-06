import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';

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
                    <Button color="primary">View compressed image</Button>
                    <Button color="secondary">View full image</Button>
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