import { Router } from 'express'
import { createUserController } from '../controllers/users.controllers'

const userRoutes: Router = Router()

userRoutes.post('', createUserController);
userRoutes.get('');
userRoutes.get('/profile');
userRoutes.patch('/:id');
userRoutes.delete('/:id');
userRoutes.put('/:id/recover');

export default userRoutes