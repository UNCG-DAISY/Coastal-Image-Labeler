const hasUser = (req) => {
    if(!req?.user) {
        location.href = "/";
    }
    return req?.user
}

export {
    hasUser
}