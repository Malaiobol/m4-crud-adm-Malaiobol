import { Request, Response } from 'express'
import { IuserReq } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUsers.service'

const createUserController = async (req: Request, resp: Response): Promise<Response> => {
    try {
        const userData: IuserReq = req.body

        const newUser = await createUserService(userData)
        return resp.status(201).json({newUser})
    } catch (err: any) {
        return resp.status(409).json({
            message: err.message
        })
    }
}

// const retrieveUsersController = async (req: Request, resp: Response): Promise<Response> =>{
//     const users =  await retrieveUsersController()
//     return resp.status(200).json({users})
// }

export {
    createUserController,
}