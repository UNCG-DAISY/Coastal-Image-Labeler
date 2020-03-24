/*
  This file is used to get the management token so that we can get user roles
  and access information from auth0. This token changes every so offten
*/

import request from "request"
import axios from 'axios'

const getManagementTokens = async ():Promise<string> => {

    //Settings for api POST request
    const options:any = {
        method: 'POST',
        url: process.env.AUTH0_TOKEN_URL,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        form: {
          grant_type: 'client_credentials',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
        }
      };
    
    console.log("Getting Auth0 management token".magenta)
    
    //Api call to get the token
    const management_data = (await axios.post(options.url,options.form)).data

    console.log("Got Auth0 management token".bgMagenta)
    return management_data.access_token
}

export {
    getManagementTokens
}
