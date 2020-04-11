import { Request,Response,NextFunction } from "express"

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next();

    console.log(Object.keys(req))
    
    res.status(401).json({
        success:true,
        data:{
           message: `Not authenticated`,
           cards:[]
        }
    })
}

function ensureAuthenticated2(req: Request, res: Response, next: NextFunction) {
    console.log('ensure auth = ',req.isAuthenticated())
    return next()
}


export{ensureAuthenticated,ensureAuthenticated2}