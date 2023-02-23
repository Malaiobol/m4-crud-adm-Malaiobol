import { NextFunction, Request, Response } from 'express'
import { QueryConfig, QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../error'

const ensureDevExistsMiddleware = async (req: Request, resp: Response, next: NextFunction): Promise<Response | void> =>{
    
    const userId: number = parseInt(req.params.id)

    const queryStringUserExists: string =
    `   
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
        ;
    `
    const queryConfigUserExists: QueryConfig = {
        text: queryStringUserExists,
        values: [userId]
    }
    
    const queryResult: QueryResult = await client.query(queryConfigUserExists)

    if(queryResult.rowCount === 0){
        throw new AppError('User not found', 404)
    }

    return next()
}

export default ensureDevExistsMiddleware