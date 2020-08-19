/*
  This handles the try catch so we dont have to repeat our self in the controller
  The way it works is you pass in a function called `fn`, then it returns a function that executes 
  the function `fn` in a promise and does catch inside it.
*/

import { Request, Response, NextFunction } from 'express'

export const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next)

//Examples
/*
const test = asyncHandler(async(req,res,next)=> {
    return "hi"
})

router.get(test)

is basically

router.get(
    (req,res,next) => Promise.resolve(async (req,res,next)=> {return "hi"}).catch(next)
)

*/
