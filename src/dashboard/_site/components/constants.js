//Constants of the project

import ip from 'ip';

const myIp = ip.address()
const port = 5000
const protocal = 'http'
const apiCall = (route) => {
    if(myIp === '127.0.0.1') {
        //return `${protocal}://${myIp}:${port}${route}`
        return `${route}`
    }
    else {
        return `${protocal}://${myIp}${route}`
    }

    //return `${route}`
    
}

const uiConstants = {
    drawerWidth:240
}

export {
    myIp,
    port,
    protocal,
    apiCall,
    uiConstants
}