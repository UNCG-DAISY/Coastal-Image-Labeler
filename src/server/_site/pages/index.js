import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../components/ProTip';
import Link from '../components/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Index({user}) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <a href="/auth/authed">
          authed page
        </a>
        <br/>
        <a href="/login">
          Login
        </a>
        <br/>
        <br/>
        <div>
          Are you logged in? {(user && 'Yes') || 'No'}
        </div>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
