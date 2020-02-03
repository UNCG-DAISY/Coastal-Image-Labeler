import request from "request"
import axios from 'axios'

const getManagementTokens = async ():Promise<string> => {
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

    const management_data = (await axios.post(options.url,options.form)).data
    return management_data.access_token
    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    //     console.log("Got token".magenta)
    //     console.log(JSON.parse(body).access_token)
    //     //return body.access_token

    //     // const testid2 = 'google-oauth2|100613204270669384478'

    //     // const options2 = {
    //     //     method: 'GET',
    //     //     url: `https://dev-omczj0l4.auth0.com/api/v2/users/${testid2}/roles`,
    //     //     headers: {authorization: `Bearer ${JSON.parse(body).access_token}`}
    //     //   };
    //     // request(options2, function (error, response, body) {
    //     //     if (error) throw new Error(error);
            
    //     //     console.log(body);
    //     // });
    // });
}

export {
    getManagementTokens
}
// const testid = 'google-oauth2|100613204270669384478'

// const options = {
//     method: 'GET',
//     url: `https://dev-omczj0l4.auth0.com/api/v2/users/${testid}/roles`,
//     headers: {authorization: 'Bearer MGMT_API_ACCESS_TOKEN'}
//     };
// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
    
//     console.log(body);
// });