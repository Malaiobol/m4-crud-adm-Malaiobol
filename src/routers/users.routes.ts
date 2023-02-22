import { Router } from 'express'
import { createUserController } from '../controllers/users.controllers'
import deleteUserService from '../services/users/deleteUser.service'

const userRoutes: Router = Router()

userRoutes.post('', createUserController)
userRoutes.get('')
userRoutes.get('/profile')
userRoutes.patch('/:id')
userRoutes.delete('/:id', deleteUserService)
userRoutes.put('/:id/recover')

export default userRoutes