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


  function generateSideContent(list,classes) {
    return list.map((item, index) => {
        return (
           <div>{item.name}</div>
        )
    })
}

function ShowArchives(props) {
    const router = useRouter();
    const {storms} = props.data
    return (
        <Drawer {...props} SideContent = {<ShowLoggedInSideDrawer/> }AppBar = {<MyAppBar pageTitle = 'Tagging Dashboard'/>}>
            <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                Start Tagging
                </Typography>
                {router.query.title}
                {generateSideContent(storms)}
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
    const mongoId = user.mongoUser[0]._id
    
    const get_archives = await axios.get(apiCall(`/api/v1/storms/${mongoId}`))
    const data = get_archives.data.data
    console.log(Object.keys(data))
    //console.log(req.query.title)

    return {
        data
    }
}

export default ShowArchives