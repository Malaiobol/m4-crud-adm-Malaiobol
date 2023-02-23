import { QueryResult } from "pg"
import { z } from 'zod'
import {
    createUserSchema, returnUserSchema, returnUserSchemaWithoutPassword
} from '../schemas/user.schemas'

type IUserReq = z.infer<typeof createUserSchema>
type IUser = z.infer<typeof returnUserSchema>
type IUserWithoutPassword = z.infer<typeof returnUserSchemaWithoutPassword>
type IUserResult = QueryResult<IUserWithoutPassword>

export {
    IUserReq,
    IUser,
    IUserResult,
    IUserWithoutPassword
}