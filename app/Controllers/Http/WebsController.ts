import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Imobil from 'App/Models/Imobil'
import Drive from '@ioc:Adonis/Core/Drive'
import Database from '@ioc:Adonis/Lucid/Database'

export default class WebsController {

    public async index({ response }: HttpContextContract) {

        const imobils = await Imobil.query().orderBy("id", "desc").where("status", false)

        const categories = await Category.query().orderBy("id", "desc")

        return response.json({ imobils, categories })

    }

    public async cover({ params, response }: HttpContextContract) {


        const cover = await Drive.getStream(`/imobil/${params.image}`)

        return response.stream(cover);
    }

    public async imobilBySlug({ params, response }: HttpContextContract) {

        const imobil = await Imobil.query().where("slug", params.slug).first()
        
        const { rows: imobilsRelated } = await Database.rawQuery(`select * from imobils where category_id = ${imobil?.category_id} and id != ${imobil?.id} order by random() limit 3`)

        return response.json({ imobil, imobilsRelated });
    }

}
