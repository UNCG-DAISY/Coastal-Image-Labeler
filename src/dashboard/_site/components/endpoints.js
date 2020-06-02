const endpoints = {
    findUser:`/api/v1/users/findUser`,
    createUser:'/api/v1/users/createUser',
    findArchive:'/api/v1/archives/FindArchive',
    getStormById(id) {
        return `/api/v1/catalogs?_id=${id}`
    },
    getStormByName(name) {
        return `/api/v1/catalogs?name=${name}`
    },
    getStormOfUser(id){
        return `/api/v1/catalogs/user/${id}`
    },
    skipImage(archive){
        return `/api/v1/images/skipImage/${archive}`
    },
    allowedPages(id){
        return `/api/v1/users/allowedPages/${id}`
    },
    getImage(archive){
        return `/api/v1/users/getImage/${archive}`
    },
    getUser: `/api/v1/users/findUser`,
    tagImage:`/api/v1/images/tagImage`,
    showImage(name){
        return `/api/v1/images/show/${name}`
    },
    getUserResumeInfo:`/api/v1/catalogs/getUserResumeInfo`,
    getPickCatalogInfo:'/api/v1/catalogs/pickCatalogInfo'
    
}

export default endpoints;