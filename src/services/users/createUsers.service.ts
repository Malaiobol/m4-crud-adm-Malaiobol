import { IUserReq, IUserResult, IUserWithoutPassword } from '../../interfaces/users.interfaces'
import { client } from '../../database'
import format from 'pg-format'
import { QueryConfig, QueryResult } from 'pg'
import { AppError } from '../../error'

const createUsersService = async (userData: IUserReq): Promise<IUserWithoutPassword> => {

    const queryStringUserExist: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `

    const queryConfigUserExists: QueryConfig = {
        text: queryStringUserExist,
        values: [userData.email]
    }

    const queryResultUserExists: QueryResult = await client.query(queryConfigUserExists)

    if(queryResultUserExists.rowCount > 0){
        throw new AppError('Email already exists', 409)
    }

    const queryString: string = format(
        `
            INSERT INTO
                users(%I)
            VALUES(%L)
            RETURNING 
                id,
                name,
                email,
                active,
                admin
            ;
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: IUserResult = await client.query(queryString)

    return queryResult.rows[0]
}

export default createUsersService