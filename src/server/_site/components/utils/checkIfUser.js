const hasUser = (req) => {
    if(!req?.user) {
        location.href = "/";
    }
}

export {
    hasUser
}