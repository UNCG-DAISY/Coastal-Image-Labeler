"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureAuthenticated(req, res, next) {
    // console.log('REQ OBJECT = ',Object.keys(req))
    // console.log('IS AUTH? = ',req.isAuthenticated())
    if (req.isAuthenticated())
        return next();
    res.status(401).json({
        success: true,
        data: {
            message: `Not authenticated`,
            cards: []
        }
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
function ensureAuthenticated2(req, res, next) {
    console.log('ensure auth = ', req.isAuthenticated());
    return next();
}
