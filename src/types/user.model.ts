import { z } from 'zod'

export const UserCredentials = z.object({
    email: z.string().email().trim(),
    password: z.string().trim(),
})

export const TokenSchema = z.string()

export const UserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    createdAt: z.string().datetime(),
    email: z.string().email(),
    id: z.string(),
    updatedAt: z.string().datetime(),
})

export const UserName = UserSchema.pick({
    firstName: true,
    lastName: true,
})

export const AuthState = z.object({
    token: TokenSchema,
    userName: UserName,
    persistIsChecked: z.boolean(),
})

export type UserCredentialsType = z.infer<typeof UserCredentials>

export type TokenType = z.infer<typeof TokenSchema>

export type UserType = z.infer<typeof UserSchema>

export type UserNameType = z.infer<typeof UserName>

export type AuthType = z.infer<typeof AuthState>