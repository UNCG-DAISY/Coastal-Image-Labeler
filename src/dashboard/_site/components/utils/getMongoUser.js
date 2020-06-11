//Function to get the mongoDB user info based off passport ID
import endpoints from '../endpoints'
import { 
    apiCall
} from '../constants'

const getMongoDBUser = async (id,ctx) => {
    //console.log('--------HOME',req?.user)
    //console.log(apiCall(endpoints.getUser))
    const getUser = await (await fetch(apiCall(endpoints.getUser), { //`/api/v1/archives/FindArchive`
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cookie": ctx?.req ? ctx.req.headers.cookie : null
        },
        body: JSON.stringify({
          userId:id
        })
    })).json()

    if(!getUser.success) {
        return {
            error:true,
            message:'No user in MongoDB'
        }
    }

    return {
        error:false,
        message:getUser.message,
        data:getUser.data.user
    }
}

export {
    getMongoDBUser
}