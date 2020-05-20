const endpoints = {
    findUser:`/api/v1/users/findUser`,
    createUser:'/api/v1/users/createUser',
    findArchive:'/api/v1/archives/FindArchive',
    getStormById(id) {
        return `/api/v1/storms?_id=${id}`
    },
    getStormOfUser(id){
        return `/api/v1/storms/user/${id}`
    },
    skipImage(archive){
        return `/api/v1/images/skipImage/${archive}`
    },
    tagImage:`/api/v1/images/tagImage`
    
}

export default endpoints;