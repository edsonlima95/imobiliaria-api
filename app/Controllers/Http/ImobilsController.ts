import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Imobil from 'App/Models/Imobil'

export default class ImobilsController {

  public async index({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {

    const data = request.body()

    await Imobil.create(data)

    return response.json(data)
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
