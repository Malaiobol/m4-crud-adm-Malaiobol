import { QueryResult } from "pg"

interface IuserReq{
    name: string,
    email: string,
    password: string | number,
    admin: boolean,
    active: boolean
}

interface Iuser extends IuserReq{
    id: number
}

type IuserWithoutPassword = Omit<Iuser, 'password'>;
type IuserResult = QueryResult<IuserWithoutPassword>;

export {
    IuserReq,
    Iuser,
    IuserResult,
    IuserWithoutPassword
}