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

    public async imobilByCategory({ response, params }: HttpContextContract) {

        const imobils = await Imobil.query().where("category_id", params.id)

        return response.json({ imobils })

    }

    public async imobilByType({ response, params }: HttpContextContract) {

        const imobils = await Imobil.query().where("type", params.type)

        return response.json({ imobils })

    }

    public async filter({ params, response }: HttpContextContract) {

        var imobils: Imobil[] = []

        const [what, category, min, max] = params["*"]

        switch (what) {
            case "rent":
                if (min > 0) {
                    imobils = await Imobil.query()
                        .where("type", "rent")
                        .where("category_id", category)
                        .where("rental_price", ">=", min)
                } else if (max > 0) {
                    imobils = await Imobil.query()
                        .where("type", "rent")
                        .where("category_id", category)
                        .where("rental_price", "<=", max)
                } else if (min > 0 && max > 0) {
                    imobils = await Imobil.query()
                        .where("type", "rent")
                        .where("category_id", category)
                        .where("rental_price", ">=", min)
                        .where("rental_price", "<=", max)
                } else {
                    imobils = await Imobil.query()
                        .where("type", "rent")
                        .where("category_id", category)
                }

                return response.json({ imobils })
            case "sale":
                if (min > 0) {
                    imobils = await Imobil.query()
                        .where("type", "sale")
                        .where("category_id", category)
                        .where("price", ">=", min)
                } else if (max > 0) {
                    imobils = await Imobil.query()
                        .where("type", "sale")
                        .where("category_id", category)
                        .where("price", "<=", max)
                } else if (min > 0 && max > 0) {
                    imobils = await Imobil.query()
                        .where("type", "sale")
                        .where("category_id", category)
                        .where("price", ">=", min)
                        .where("price", "<=", max)
                } else {
                    imobils = await Imobil.query()
                        .where("type", "sale")
                        .where("category_id", category)
                }

                return response.json({ imobils })

            default:
                return imobils
        }

    }
}
