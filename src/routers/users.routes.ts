import { Router } from 'express'
import deleteUserService from '../services/users/deleteUser.service'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middlewares'
import { createUserSchema } from '../schemas/user.schemas'
import { 
    createUserController, 
    retrieveUsersController 
} from '../controllers/users.controllers'



const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(createUserSchema), createUserController)
userRoutes.get('', retrieveUsersController)
userRoutes.get('/profile')
userRoutes.patch('/:id')
userRoutes.delete('/:id', deleteUserService)
userRoutes.put('/:id/recover')

export default userRoutes