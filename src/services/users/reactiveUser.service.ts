import { client } from '../../database'
import { QueryConfig, QueryResult } from 'pg'
import { AppError } from '../../error'

const reactiveUserService = async (userId: number): Promise<void> =>{
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

    const activeUser: boolean = queryResult.rows[0].active

    if(activeUser){
        throw new AppError('User already active', 400)
    }

    const queryString: string = 
    `   
        UPDATE
            users
        SET
            active = true
        WHERE
            id = $1
        ;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    await client.query(queryConfig)
}

export default reactiveUserService