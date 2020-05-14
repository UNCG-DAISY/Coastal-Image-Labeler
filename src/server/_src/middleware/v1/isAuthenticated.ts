import { Request,Response,NextFunction } from "express"

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    // console.log('REQ OBJECT = ',Object.keys(req))
    // console.log('IS AUTH? = ',req.isAuthenticated())
    if (req.isAuthenticated()) return next();

    
    
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

export{ensureAuthenticated}