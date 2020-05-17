"use strict";
/*
    TODO later once this file is done
*/
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = require("../../utils/v1/errorResponse");
//protect routes
// const protect = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
//     let token;
//     if(!req?.user) {
//         //res.redirect('/');
//         return next(new ErrorResponse('Not authorized to access this route',401))
//     }
//     //User is good to access
//     next()
// })
//Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        // console.log('Must have role = ',roles)
        // console.log('User has = ',req?.user?.mongoUser?.role)
        // console.log(Object.keys(req.user))
        var _a, _b, _c;
        if (!((_b = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.mongoUser) === null || _b === void 0 ? void 0 : _b.role.includes(...roles))) {
            return next(new errorResponse_1.ErrorResponse(`User/User role ${(_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.displayName} is not authorized to access this route`, 403));
        }
        next();
    };
};
exports.authorize = authorize;
