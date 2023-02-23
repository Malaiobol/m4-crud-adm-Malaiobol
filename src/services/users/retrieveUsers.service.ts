import { IUserResult, IUsersList } from '../../interfaces/users.interfaces'
import { client } from '../../database'
import { QueryConfig } from 'pg'
import { usersList } from '../../schemas/user.schemas'

const retrieveAllUsers = async () =>{

    const queryString = 
    `
        SELECT 
            *
        FROM 
           users  
    `
    const queryConfig: QueryConfig ={
        text: queryString
    }

    const queryResult: IUserResult = await client.query(queryConfig)
    const users: IUsersList = usersList.parse(queryResult.rows)
    return users
}

export default retrieveAllUsers