import { Router } from 'express'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middlewares'
import { createLoginCrontroller } from '../controllers/login.controllers'
import { createLoginSchema } from '../schemas/login.schemas'

const loginRoutes: Router = Router()

loginRoutes.post('', ensureDataIsValidMiddleware(createLoginSchema), createLoginCrontroller)

export default loginRoutes
