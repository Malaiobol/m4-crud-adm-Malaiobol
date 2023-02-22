import { QueryResult } from "pg"

interface IUserReq {
    name:string,
    email: string,
    password: string,
    admin: boolean,
    active: boolean
}

interface IUser extends IUserReq{
    id: number
}

type IUserWithoutPassword = Omit<IUser, 'password'>
type IUserResult = QueryResult<IUserWithoutPassword>

export {
    IUserReq,
    IUser,
    IUserResult,
    IUserWithoutPassword
}