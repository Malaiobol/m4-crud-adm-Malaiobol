import { NextFunction, Request, Response } from 'express'
import { QueryConfig, QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../error'

const ensureEmailIsUnique = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userEmail = req.body.email

    const queryStringUserExists: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `

    const queryConfigUserExists: QueryConfig = {
        text: queryStringUserExists,
        values: [userEmail]
    }

    const queryResult: QueryResult = await client.query(queryConfigUserExists)

    if(queryResult.rowCount > 0){
        throw new AppError('Email already exists', 409)
    }

    return next()
}

export default ensureEmailIsUnique