import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    margin: theme.spacing(1),
  },
  redButton : {
    backgroundColor:'#FF5733'
  }
}));

export default function Test({user}) {
  const classes = useStyles();
  return (
    <>
      <div>
        Are you logged in? {(user && 'Yes' && user.id) || 'No'}
      </div>

      <div>
        You are user: {user.displayName}
      </div>
      
      <a href='\login' className= {classes.link}>
        <Button variant="contained">Login</Button>
      </a>

      <a href='\logout'  className= {`${classes.link} ${classes.redButton}`} styles={{backgroundColor:'red'}}>
        <Button variant="contained" className= {`${classes.redButton}`}>Logout</Button>
      </a>

      <a href='\auth\auth1'  className= {classes.link}>
        <Button variant="contained" color="secondary">
          Auth 1
        </Button>
      </a>

      {/* <a href='\auth\auth2'  className= {classes.link}>
        <Button variant="contained" color="primary">
          Auth 2
        </Button>
      </a>         */}
    </>
  );
}
