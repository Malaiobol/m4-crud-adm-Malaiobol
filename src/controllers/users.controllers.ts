import { Request, Response } from 'express'
import { IuserReq } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUsers.service'

const createUserController = async (req: Request, resp: Response): Promise<Response> => {
    const userData: IuserReq = req.body
    const newUser = await createUserService(userData)
    return resp.status(201).json({newUser})
}

// const retrieveUsersController = async (req: Request, resp: Response): Promise<Response> =>{
//     const users =  await retrieveActualUser()
//     return resp.status(200).json({users})
// }

export {
    createUserController,
}