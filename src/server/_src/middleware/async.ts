import { Request,Response,NextFunction } from "express"

//This handles the try catch so we dont have to repeat our self in the controller

//The way it works is you pass in a function called `fn`, then it returns a function that executes 
//the function `fn` in a promise and does catch inside it.
export const asyncHandler = (fn:Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next)

