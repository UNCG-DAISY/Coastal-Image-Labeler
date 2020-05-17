//Simple function to check if user exists

const hasUser = (req) => {
    if(!req?.user) {
        location.href = "/";
    }
    return req?.user
}

export {
    hasUser
}