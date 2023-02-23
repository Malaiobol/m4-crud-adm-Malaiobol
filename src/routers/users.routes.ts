import { Router } from 'express'
import ensureEmailIsUnique from '../middlewares/ensureEmailIsUnique.middlewares'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middlewares'
import { 
    createUserSchema, 
    updatedUserSchema 
} from '../schemas/user.schemas'
import { 
    createUserController, 
    deleteUserController, 
    reactiveUserController, 
    retrieveUsersController, 
    updateUserController
} from '../controllers/users.controllers'

const userRoutes: Router = Router()

userRoutes.post('', ensureEmailIsUnique, ensureDataIsValidMiddleware(createUserSchema), createUserController)
userRoutes.get('', retrieveUsersController)
userRoutes.get('/profile')
userRoutes.patch('/:id', ensureEmailIsUnique,ensureDataIsValidMiddleware(updatedUserSchema), updateUserController)
userRoutes.delete('/:id', deleteUserController)
userRoutes.put('/:id/recover', reactiveUserController)

export default userRoutes