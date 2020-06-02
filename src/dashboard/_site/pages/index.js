import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/layouts/Layout'


// This is the home page
export default function Index(props) {
  return (
    // <Drawer SideContent = {<LoginSideDrawer/>}{...props} AppBar = {<MyAppBar pageTitle = 'Home Page'/>}>
    <Layout>
       <Container maxWidth="md">
        <Box my={4}>
          <Typography paragraph>
            Welcome to Coastal Image Labeler Dashboard, please login
          </Typography>
        </Box>
      </Container>
    </Layout>
     
    // </Drawer>
  
  );
}
