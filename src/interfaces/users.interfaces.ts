import { QueryResult } from "pg"
import { z } from 'zod'
import {
    createUserSchema, 
    returnUserSchema, 
    returnUserSchemaWithoutPassword,
    usersList,

    updatedUserSchema,
    returnUpdatedUserSchema,
    returnUpdatedUserWithoutPassword
} from '../schemas/user.schemas'

type IUserReq = z.infer<typeof createUserSchema>
type IUser = z.infer<typeof returnUserSchema>
type IUserWithoutPassword = z.infer<typeof returnUserSchemaWithoutPassword>
type IUsersList = z.infer<typeof usersList>
type IUserResult = QueryResult<IUserWithoutPassword>
type IUserResultWithPassword = QueryResult<IUser>

type IUpdateReq = z.infer<typeof updatedUserSchema>
type IUpdatedUser = z.infer<typeof returnUpdatedUserSchema>
type IUpdatedUserWithoutPassword = z.infer<typeof returnUpdatedUserWithoutPassword>
type IUpdatedUserResult = QueryResult<IUpdatedUserWithoutPassword>

export {
    IUserReq,
    IUser,
    IUserResult,
    IUserWithoutPassword,
    IUserResultWithPassword,
    IUsersList,

    IUpdateReq,
    IUpdatedUser,
    IUpdatedUserWithoutPassword,
    IUpdatedUserResult
}