import { IuserReq, IuserResult, IuserWithoutPassword } from '../../interfaces/users.interfaces'
import { client } from '../../database'
import format from 'pg-format'
import { QueryConfig, QueryResult } from 'pg'
import { AppError } from '../../error'


const createUserServices = async (userData: IuserReq): Promise<IuserWithoutPassword> =>{

    const queryString: string = format(
        `
            INSERT INTO
                users(%I)
            VALUES(%L)
            RETURNING 
                id, 
                name, 
                email, 
                admin, 
                active
            ;
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryStringUserExist: string =
    `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
        ;    
    `
    
    const queryConfigUserExists: QueryConfig = {
        text: queryStringUserExist,
        values: [userData.email]
    } 

    const queryResultUserExists: QueryResult = await client.query(queryConfigUserExists)
    if(queryResultUserExists.rowCount > 0){
        throw new AppError('E-mail already registered', 409)
    }
    const  queryResult: IuserResult = await client.query(queryString)
    return queryResult.rows[0]
}

export default createUserServices