import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Imobil from 'App/Models/Imobil'

export default class HomeController {

    public async home({ params, response }: HttpContextContract) {

        const user_id = params.id

        //Buscar todos os imóveis
        const imobils = await Imobil.query().where("user_id", user_id)

        //Buscar imóveis vendidos
        const sale = await Imobil.query()
            .where("user_id", user_id)
            .where("status", true)
            .where("type", "sale")

        //Buscar imóveis alugados
        const rent = await Imobil.query()
            .where("user_id", user_id)
            .where("status", true)
            .where("type", "rent")

        return response.json({ total: imobils.length, sale: sale.length, rent: rent.length })

    }

}
