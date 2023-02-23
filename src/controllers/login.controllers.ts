import { Request, Response } from 'express';
import createLoginService from '../services/login/createLogin.service'

const createLoginCrontroller = async (req: Request, resp: Response): Promise<Response> =>{

    const token = await createLoginService(req.body)

    return resp.json({
        token: token
    })
}

export { 
    createLoginCrontroller
}