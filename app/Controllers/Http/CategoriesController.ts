import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {

  public async index({ response }: HttpContextContract) {

    const categories = await Category.query().orderBy("id","desc")

    return response.json({ categories })

  }

  public async store({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
