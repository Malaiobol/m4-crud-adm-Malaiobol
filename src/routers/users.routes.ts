import { Router } from 'express'
import ensureEmailIsUnique from '../middlewares/ensureEmailIsUnique.middlewares copy'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middlewares'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middlewares'
import ensureDevExistsMiddleware from '../middlewares/ensureDevExists.middlewares'
import ensureDevIsAdminMiddleware from '../middlewares/ensureDevIsAdmin.middlewares'
import ensureIsActualDevMiddleware from '../middlewares/ensureIsActualDev.middlewares'
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
    retrieveLoggedUserController
} from '../controllers/users.controllers'

const userRoutes: Router = Router()

userRoutes.post('', ensureEmailIsUnique, ensureDataIsValidMiddleware(createUserSchema), createUserController)
userRoutes.get('', ensureTokenIsValidMiddleware, ensureDevIsAdminMiddleware, retrieveUsersController)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, retrieveLoggedUserController)
userRoutes.patch('/:id', ensureTokenIsValidMiddleware, ensureIsActualDevMiddleware, ensureDevExistsMiddleware, ensureEmailIsUnique, ensureDataIsValidMiddleware(updatedUserSchema), updateUserController)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureIsActualDevMiddleware, ensureDevExistsMiddleware, deleteUserController)
userRoutes.put('/:id/recover', ensureTokenIsValidMiddleware, ensureDevExistsMiddleware, ensureDevIsAdminMiddleware, reactiveUserController)

export default userRoutes