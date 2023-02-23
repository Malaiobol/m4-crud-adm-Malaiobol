import { NextFunction, Request, Response } from 'express';

const ensureTokenIsValidMiddleware  = async (req: Request, resp: Response, next: NextFunction): Promise<void> =>{

    

    return next()
}

export default ensureTokenIsValidMiddleware