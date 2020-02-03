//This file handles errors during API calls

import { Request,Response,NextFunction } from "express"
import {ErrorResponse} from '../../utils/errorResponse'

//Couldnt find the err type, atleast the one that works
export const errorHandler = (err:any ,req: Request, res: Response, next: NextFunction) => {
    
    let error = {...err}

    //set message
    error.message = err?.message

    // Log to console
    console.log(err?.stack?.red)

    //Mongoose bad ObjectId (not formatted properly or not found)
    if(err?.name === 'CastError') {
        const message = `Resource not found with that ID of ${err?.value ?? ''}`
        error = new ErrorResponse(message,404)
    }

    //Mongoose duplicate key
    if(err?.code === 11000 ) {
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message,400)
    }

    //Mongoose validation error
    if(err?.name === 'ValidationError') {
        const message:string = (Object.values(err?.errors) as Error[]).map(val => val.message).join(',')
        error = new ErrorResponse(message,400)
    }

    res.status(error.statusCode ?? 500).json({
        success:false,
        error:error.message ?? 'Server Error'
    })
}