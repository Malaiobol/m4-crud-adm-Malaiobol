import { NextFunction, Request, Response } from 'express'
import { AppError } from '../error'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const ensureTokenIsValidMiddleware  = async (req: Request, resp: Response, next: NextFunction): Promise<void> =>{

    let token = req.headers.authorization
    
    if(!token){
        throw new AppError('Missing Bearer Token', 401)
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any)=>{
        if(error){
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: parseInt(decoded.sub),
            admin: decoded.role
        }

        return next() 
    })    
}

export default ensureTokenIsValidMiddleware