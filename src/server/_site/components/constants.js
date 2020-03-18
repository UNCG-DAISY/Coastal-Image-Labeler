//Constants of the project

import ip from 'ip';

const myIp = ip.address()
const port = 5000
const protocal = 'http'
const apiCall = (route) => {
    return `${protocal}://${myIp}:${port}${route}`
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