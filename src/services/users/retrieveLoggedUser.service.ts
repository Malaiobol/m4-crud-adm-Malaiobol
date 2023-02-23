import { client } from '../../database'
import { QueryConfig } from 'pg'
import { IUserWithoutPassword } from '../../interfaces/users.interfaces'
import { returnUserSchemaWithoutPassword } from '../../schemas/user.schemas'

const retrieveLoggedUserService = async (userId: number): Promise<IUserWithoutPassword> => {
    const queryString: string =
    `
        SELECT
            *
        FROM
            users
        WHERE   
            id = $1
        ;
    `

    const queryConfig: QueryConfig ={
        text: queryString,
        values: [userId]
    }

    const queryResult = await client.query(queryConfig)
    const actualUser: IUserWithoutPassword =  returnUserSchemaWithoutPassword.parse(queryResult.rows[0])
    return actualUser
}

export default retrieveLoggedUserService