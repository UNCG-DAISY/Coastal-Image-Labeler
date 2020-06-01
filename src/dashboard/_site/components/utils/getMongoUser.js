//Function to get the mongoDB user info based off passport ID
import endpoints from '../endpoints'
import { 
    apiCall
} from '../constants'

const getMongoDBUser = async (id) => {
    //console.log('--------HOME',req?.user)
    const getUser = await (await fetch(apiCall(endpoints.getUser), { //`/api/v1/archives/FindArchive`
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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