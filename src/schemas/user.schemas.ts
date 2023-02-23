import { z } from 'zod'

const createUserSchema = z.object({
    name: z.coerce.string().max(50),
    email: z.coerce.string().email(),
    password: z.string(),
    active: z.boolean().default(true),
    admin: z.boolean().default(false)
})

const returnUserSchema = createUserSchema.extend({
    id: z.string()
})

const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})

const usersList = z.array(returnUserSchemaWithoutPassword)

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    usersList
}
