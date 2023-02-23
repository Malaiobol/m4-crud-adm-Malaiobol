import { hashSync } from 'bcryptjs'
import { z } from 'zod'

const createUserSchema = z.object({
    name: z.string().max(50),
    email: z.string().email(),
    password: z.string().transform((pass)=>{
        return hashSync(pass, 10)
    }),
    admin: z.boolean().default(false)
})

const returnUserSchema = createUserSchema.extend({
    active: z.boolean().default(true),
    id: z.string(),
})

const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})
const usersList = z.array(returnUserSchemaWithoutPassword)

const updatedUserSchema = z.object({
    name: z.string().max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().optional()
})

const returnUpdatedUserSchema = updatedUserSchema.extend({
    id: z.string(),
    active: z.boolean(),
    admin: z.boolean()
})

const returnUpdatedUserWithoutPassword = returnUpdatedUserSchema.omit({password: true})

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    usersList,

    updatedUserSchema,
    returnUpdatedUserSchema,
    returnUpdatedUserWithoutPassword
}
