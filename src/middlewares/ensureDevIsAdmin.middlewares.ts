import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"

const ensureDevIsAdminMiddleware = async (req: Request, resp: Response, next: NextFunction): Promise<void> =>{
    const actualUser = req.user 

    if(actualUser.admin === false){
        throw new AppError('Insufficient Permission', 403)
    }

    return next()
}

export default ensureDevIsAdminMiddleware