import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  public async index({ request, response }: HttpContextContract) {

    const { user_id } = request.qs()

    const user = await User.find(user_id)

    return response.json({ user })

  }

  public async store({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }

}
