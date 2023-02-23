import { Request, Response } from 'express'
import { IUserReq } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUsers.service'
import deleteUserService from '../services/users/deleteUser.service'
import retrieveAllUsers from '../services/users/retrieveUsers.service'

const createUserController = async (req: Request, resp: Response): Promise<Response> => {
    const userData: IUserReq = req.body
    const newUser = await createUserService(userData)
    return resp.status(201).json(newUser)
}

const deleteUserController = async (req: Request, resp: Response): Promise<Response> =>{
    const userId: number = parseInt(req.params.id)
    await deleteUserService(userId)
    return resp.status(204).send()
}

const retrieveUsersController = async (req: Request, resp: Response): Promise<Response> =>{
    const users =  await retrieveAllUsers()
    return resp.json(users)
}

export {
    createUserController,
    retrieveUsersController
}