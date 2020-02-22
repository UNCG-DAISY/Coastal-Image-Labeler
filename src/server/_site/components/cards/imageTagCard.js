import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

//radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// import amber from '@material-ui/core/colors/amber';
import * as colors from '@material-ui/core/colors/';


const useStyles = makeStyles(theme  => ({
    root: {
      maxWidth: 1345,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'left',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    formControl: {
        margin: theme.spacing(3),
    },
  }));
  
  
  export default function TagImageCard(props) {
  
    const classes = useStyles();
  
    const [expanded, setExpanded] = React.useState(true);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const [devTypeValue, setDevTypeValue] = React.useState("-1");
    const [impactTypeValue, setImpactTypeValue] = React.useState("-1");

    const handleChange = (event,fnc) => {
        fnc(event.target.value);
    };
  
    return (
   
        <Card className={classes.root}>
            <CardActions disableSpacing>
                
                <IconButton
               
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })} />
                </IconButton>
            </CardActions>
            <CardActionArea 
                onClick = {() => {
                    window.open( props.imagePath, props.imagePath); 
                }}
            >
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            
                <CardMedia
                    component="img"
                    alt="No image found"
                    height="140"               
                    image={props.imagePath}
                    title="Image to tag"
                />
            </Collapse>
            </CardActionArea>

            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.imagePath}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" ><div style = {{color:colors.amber[500]}}>Development Type = {devTypeValue}</div></FormLabel>
                    <RadioGroup 
                        aria-label="devType" 
                        name="devType" 
                        value={devTypeValue}
                        onChange={(event) => handleChange(event,setDevTypeValue)} 
                        row
                    >
                        <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label="Undeveloped"
                            labelPlacement="end"
                         
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="Developed"
                            labelPlacement="end"
                        />
                    </RadioGroup>

                    <FormLabel component="legend" ><div style = {{color:colors.blue[500]}}>Impact Type = {impactTypeValue}</div></FormLabel>
                    <RadioGroup 
                        aria-label="impactType" 
                        name="impactType" 
                        value={impactTypeValue}
                        onChange={(event) => handleChange(event,setImpactTypeValue)} 
                        row
                    >
                        <FormControlLabel
                            value="0"
                            control={<Radio color="primary" />}
                            label="No Impact"
                            labelPlacement="end"
                         
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="Impact"
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </FormControl>
            </Typography>
            </CardContent>

            <CardActions>
            <Button size="small" color="primary">
                Share
            </Button>
            <Button size="small" color="primary">
                Learn More
            </Button>
            </CardActions>
        </Card>

      
    );
  }