//Simple function to check if user exists

const hasUser = (req) => {
    //console.log('--------HOME',req?.user)
    if(!req?.user) {
        location.href = "/";
    }
    return req?.user
}

export {
    hasUser
}