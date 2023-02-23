import { QueryConfig } from 'pg'
import { ILoginRequest } from '../../interfaces/login.interface'
import { IUserResult, IUserResultWithPassword } from '../../interfaces/users.interfaces'
import { client } from '../../database'
import { AppError } from '../../error' 
import { compare } from 'bcryptjs'
import  jwt  from 'jsonwebtoken'

const createLoginService = async (loginData: ILoginRequest): Promise<string> =>{

    const queryString: string = 
    `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
        ;
    `
    const queryConfig: QueryConfig ={
        text: queryString,
        values: [loginData.email]
    }

    const queryResult: IUserResultWithPassword = await client.query(queryConfig)
    
    if(queryResult.rowCount === 0 ){
        throw new AppError ('Wrong email or password', 401)
    }

    const matchPass: boolean = await compare(loginData.password, queryResult.rows[0].password)

    if(!matchPass){
        throw new AppError ('Wrong email or password', 401)
    }

    const activeUser: boolean = queryResult.rows[0].active

    if(!activeUser){
        throw new AppError ('Wrong email or password', 401)
    }

    const token: string = jwt.sign(
        {
            role: queryResult.rows[0].admin
        },
        'CHAVE SECRETA',
        {
            expiresIn: '24h',
            subject: queryResult.rows[0].id.toString()
        }
    )

    return token
}

export default createLoginService