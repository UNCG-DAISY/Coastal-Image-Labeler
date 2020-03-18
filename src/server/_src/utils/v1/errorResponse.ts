/*
    this is a custom class we use for errors that extends the default error object.
    For example we add the statusCode to this object.
*/
export class ErrorResponse extends Error {

    statusCode: number

    constructor(message:string,statusCode:number) {
        super(message)
        this.statusCode = statusCode
    }
}