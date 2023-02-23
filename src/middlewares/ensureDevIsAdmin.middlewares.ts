import { NextFunction, Request, Response } from 'express'
import { AppError } from '../error'

const ensureDevIsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    const isAdmin = req.user.admin

    if(!isAdmin){
        throw new AppError('Insufficient Permission', 403)
    }

    return next()
}

export default ensureDevIsAdmin