import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Test from '../../components/utils/test'
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'

function About(props) {
  return (

    <Drawer {...props}>
     <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          About.js
        </Typography>
        <Test user={props.user} />
        
      </Box>
    </Container>
    </Drawer>
    
  );
}

About.getInitialProps = async ctx => {
  const {req,res} = ctx
  console.log( '' ?? 1111)

  hasUser(req)
 
  return {}
}

export default About