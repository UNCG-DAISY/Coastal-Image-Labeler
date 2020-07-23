//Constants of the project

import ip from 'ip';

const myIp = ip.address()
const port = 5000
const protocal = process?.env?.NEXT_PUBLIC_PROTOCOL
const apiCall = (route) => {
    return `${protocal}://${process?.env?.NEXT_PUBLIC_API_URL}${route}`
    //return `${route}`
    
}

const uiConstants = {
    drawerWidth:240
}

const URL = `${protocal}://${process?.env?.NEXT_PUBLIC_API_URL}`

export {
    myIp,
    port,
    protocal,
    apiCall,
    uiConstants,
    URL
}