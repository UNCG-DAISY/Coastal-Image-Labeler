import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Test from '../../components/utils/test'
import {hasUser} from '../../components/utils/checkIfUser'
import Drawer from '../../components/layouts/drawer'
import MyAppBar from '../../components/layouts/appBar'
import ShowLoggedInSideDrawer from '../../components/layouts/showLoggedInSideDrawer'
import { useRouter } from 'next/router';
import axios from 'axios'
import { 
    myIp,
    port,
    protocal,
    apiCall
  } from '../../components/constants'


function ShowArchives(props) {
    const router = useRouter();
    return (
        <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
            <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                About.js
                </Typography>
            
                {/* <Test user={props.user} /> */}
            </Box>
            </Container>
        </Drawer>

    );
}

ShowArchives.getInitialProps = async ctx => {
    const {req,res} = ctx

    //First check if user exists
    const user = hasUser(req)

    //Then get all archives for such user
    const {id} = user

    //const archives = await axios.post(apiCall(`/api/v1/users/archives/${id}`))

    return {}
}

export default ShowArchives