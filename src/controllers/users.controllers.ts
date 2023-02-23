import { Request, Response } from 'express'
import { IUserReq } from '../interfaces/users.interfaces'
import updateUserReq from '../services/users/updateUser.service'
import createUserService from '../services/users/createUser.service'
import deleteUserService from '../services/users/deleteUser.service'
import retrieveAllUsers from '../services/users/retrieveUsers.service'
import reactiveUserService from '../services/users/reactiveUser.service'

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

const updateUserController = async (req: Request, resp: Response): Promise<Response> =>{
    const userId: number = parseInt(req.params.id)
    const updateReq: string = req.body
    const updatedUser = await updateUserReq(userId, updateReq)
    return resp.status(200).json(updatedUser)
}

const reactiveUserController = async (req: Request, resp: Response): Promise<Response> =>{
    const userId: number = parseInt(req.params.id)
    const reactivedUser = await reactiveUserService(userId)
    return resp.status(200).json(reactivedUser)
}

const retrieveLoggedUser = () =>{

}

export {
    createUserController,
    retrieveUsersController,
    updateUserController,
    deleteUserController,
    reactiveUserController,
    retrieveLoggedUser
}