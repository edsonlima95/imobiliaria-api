import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'
import LoginValidator from 'App/Validators/LoginValidator'


type Response = {
    user: {
        id: number,
        name: string,
        email: string,

    },
    token: string,
}

export default class AuthController {

    public async login({ auth, response, request }: HttpContextContract) {

        const { email, password } = request.body()

        try {
         await request.validate(LoginValidator)
          
        } catch (error) {
            return response.internalServerError(error.messages)
        }

        try {

            const { token } = await auth.use('api').attempt(email, password,{
                expiresIn: "1days"
            })

            const res: Response = {
                user: {
                    id: auth.user.id,
                    name: auth.user.name,
                    email: auth.user.email,
                },
                token
            }

            return response.json(res)

        } catch (error) {
            return response.internalServerError({ message: 'Email ou senha incorreto'})
        }

    }

    public async signIn({ response, request }: HttpContextContract) {

        try {

            const payload = await request.validate(UserValidator)

            await User.create(payload)

            return response.json({ message: "Usuário cadastrado com sucesso" })

        } catch (error) {

            response.badRequest(error.messages)
        }

    }

    public async checkToken({ response, auth }) {

        try {

            await auth.use('api').authenticate()
            return auth.use('api').isAuthenticated

        } catch {
            return response.unauthorized({ error: 'invalid token' })
        }
    }
}
