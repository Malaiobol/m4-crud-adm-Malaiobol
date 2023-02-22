import { NextFunction, Response, Request } from "express"

class AppError extends Error{
    message: string
    statusCode: number

    constructor(message: string, statusCode: number = 400){
        super()
        this.message = message,
        this.statusCode = statusCode 
    }
}   

const handleErrors = (err: Error, req: Request, resp: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return resp.status(err.statusCode).json({
            message: err.message
        })  
    } 
    console.log(err)
    return resp.status(500).json({
        message: 'Internal server error'
    })
}

export {
    AppError,
    handleErrors  
}