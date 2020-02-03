import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Test from '../components/test'
import Drawer from '../components/drawer'
import LoginSideDrawer from '../components/loginSideDrawerContent'
// import Link from '../components/Link'

export default function Index(props) {
  return (
    // <Container maxWidth="sm">
    //   <Box my={4}>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Next.js example
    //     </Typography>
    //     <Test user/>
    //   </Box>
    // </Container>
    <Drawer SideContent = {<LoginSideDrawer/>}{...props}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography paragraph>
            Welcome to PSI-Dashboard, please login
          </Typography>
        </Box>
      </Container>
    </Drawer>
  );
}
