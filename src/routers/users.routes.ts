import { Router } from 'express'
import ensureEmailIsUnique from '../middlewares/ensureEmailIsUnique.middlewares'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middlewares'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middlewares'
import ensureDevExistsMiddleware from '../middlewares/ensureDevExists.middlewares'
import { 
    createUserSchema, 
    updatedUserSchema 
} from '../schemas/user.schemas'
import { 
    createUserController, 
    deleteUserController, 
    reactiveUserController, 
    retrieveUsersController, 
    updateUserController,
    retrieveLoggedUser
} from '../controllers/users.controllers'

const userRoutes: Router = Router()

userRoutes.post('', ensureEmailIsUnique, ensureDataIsValidMiddleware(createUserSchema), createUserController)
userRoutes.get('', ensureTokenIsValidMiddleware, retrieveUsersController)
userRoutes.get('/profile', ensureTokenIsValidMiddleware)
userRoutes.patch('/:id', ensureDevExistsMiddleware, ensureTokenIsValidMiddleware, ensureEmailIsUnique, ensureDataIsValidMiddleware(updatedUserSchema), updateUserController)
userRoutes.delete('/:id', ensureDevExistsMiddleware, ensureTokenIsValidMiddleware, deleteUserController)
userRoutes.put('/:id/recover', ensureDevExistsMiddleware, ensureTokenIsValidMiddleware, reactiveUserController)

export default userRoutes