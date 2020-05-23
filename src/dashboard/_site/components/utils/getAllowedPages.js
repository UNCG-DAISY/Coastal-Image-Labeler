import { 
    apiCall
  } from '../constants'

import endpoints from '../endpoints'

async function getAllowedPages(user,ctx) {
    
    const id = user?.id || undefined

    const defaultAllowed = {
        tagger:false
    }

    if(id) {
        const allowedPages = await (await fetch(apiCall(
            endpoints.allowedPages(id)
            ), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"credentials": "include",
                "cookie": ctx.req ? ctx.req.headers.cookie : null ,
            }
        })).json();
        return (allowedPages?.data?.allowedPages)
    }
    else {
        return defaultAllowed
    }
    

}

export{
    getAllowedPages
}