import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../components/layouts/Layout'
import theme from '../components/theme'
import Paper from '@material-ui/core/Paper';

// This is the home page
export default function Index(props) {
  return (
    // <Drawer SideContent = {<LoginSideDrawer/>}{...props} AppBar = {<MyAppBar pageTitle = 'Home Page'/>}>
    <Layout>
       <Container maxWidth="md">
        <Box my={4}>
          <Typography paragraph>
          <Paper elevation={3} variant="outlined" style={{padding:10}}>
            Welcome to Coastal Image Labeler, please login.

            You can read about the project <Linky color={theme.palette.secondary.main} href="https://github.com/UNCG-DAISY/Coastal-Image-Labeler">here</Linky>.

            If you have questions, please contact Evan Goldstein:  
            
            <Linky color={theme.palette.secondary.main} href="mailto:ebgoldst@uncg.edu">ebgoldst@uncg.edu</Linky>.
            </Paper>
          </Typography>
          
        </Box>
      </Container>
    </Layout>
     
    // </Drawer>
  
  );
  
}

function Linky(props) {
  return (
    <a style={{color:props.color}} href={props.href}>
      {props.children}
    </a>
  )
}
