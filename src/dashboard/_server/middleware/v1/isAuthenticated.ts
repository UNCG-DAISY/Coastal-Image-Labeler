import { Request,Response,NextFunction } from "express"

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    console.log('ENSURING AUTH')

    if (req.isAuthenticated()) return next();

    res.status(401).json({
        success:true,
        message: `Not authenticated`,
        data:{
        }
    })
}

function ensureAuthenticated2(req: Request, res: Response, next: NextFunction) {
    console.log('ensure auth = ',req.isAuthenticated())
    return next()
}

export{ensureAuthenticated}