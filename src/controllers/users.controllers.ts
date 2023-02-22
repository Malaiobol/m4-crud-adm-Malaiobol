import { Request, Response } from 'express'
import { AppError } from '../error'
import { IuserReq } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUsers.service'

const createUserController = async (req: Request, resp: Response): Promise<Response> => {
    try {
        const userData: IuserReq = req.body
        const newUser = await createUserService(userData)
        return resp.status(201).json({newUser})
    } catch (err: any) {
        if(err instanceof AppError){
            return resp.status(err.statusCode).json({
                message: err.message
            })  
        } 
        console.log(err)
        return resp.status(500).json({
            message: 'Internal server error'
        })
    }
}

// const retrieveUsersController = async (req: Request, resp: Response): Promise<Response> =>{
//     const users =  await retrieveActualUser()
//     return resp.status(200).json({users})
// }

export {
    createUserController,
}