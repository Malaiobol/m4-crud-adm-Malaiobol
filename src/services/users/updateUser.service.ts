import { QueryConfig } from 'pg'
import format from 'pg-format'
import { client } from '../../database'
import { returnUpdatedUserWithoutPassword } from '../../schemas/user.schemas'
import {
    IUpdatedUserWithoutPassword,
    IUpdatedUserResult
} from '../../interfaces/users.interfaces'


const updateUserReq = async (userId: number, updateReq: string): Promise<IUpdatedUserWithoutPassword> => {

    const queryString = format(
        `
            UPDATE  
                users
            SET(%I) = ROW(%L)
            WHERE
                id = $1
            RETURNING *;
        `,
        Object.keys(updateReq),
        Object.values(updateReq)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: IUpdatedUserResult  = await client.query(queryConfig)
    const updatedUser: IUpdatedUserWithoutPassword = returnUpdatedUserWithoutPassword.parse(queryResult.rows[0])
    return updatedUser
}

export default updateUserReq