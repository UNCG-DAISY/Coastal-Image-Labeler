"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
function ensureAuthenticated(req, res, next) {
    //console.log('ENSURING AUTH')
    if (req.isAuthenticated())
        return next();
    res.status(401).json({
        success: true,
        message: `Not authenticated`,
        data: {}
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
function ensureAuthenticated2(req, res, next) {
    console.log('ensure auth = ', req.isAuthenticated());
    return next();
}
