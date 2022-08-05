import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Imobil from 'App/Models/Imobil'
import Drive from '@ioc:Adonis/Core/Drive'
import ImobilValidator from 'App/Validators/ImobilValidator'


export default class ImobilsController {

  private PAGE_LIMIT: number = 5

  public async index({ request, response }: HttpContextContract) {

    const { user_id, page } = request.qs()

    const imobils = await Imobil.query()
      .where("user_id", user_id)
      .orderBy("id", 'desc')
      .paginate(page, this.PAGE_LIMIT)

    return response.json({ imobils })

  }

  public async store({ request, response }: HttpContextContract) {

    try {
      const coverImage = request.file('file')

      const data = await request.validate(ImobilValidator)

      await coverImage?.moveToDisk('./imobil')

      await Imobil.create({
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        category_id: data.category_id,
        image: coverImage?.fileName,
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        status: data.status,
        type: data.type,

        price: Number(data.price),
        rental_price: Number(data.rental_price),
        area: data.area,
        garage: data.garage,
        bedroom: data.bedroom,
        bathroom: data.bathroom,
        kitchen: data.kitchen,
        living_room: data.living_room,
        dining_room: data.dining_room,
        suites: data.suites,

        pool: data.pool,
        gym: data.gym,
        closet: data.closet,
        furnished_kitchen: data.furnished_kitchen,
        american_kitchen: data.american_kitchen,
        backyard: data.backyard,
        garden: data.garden,
        deck: data.deck,
        grill: data.grill,

      })

      return response.json({ message: "Imóvel cadastrado com sucesso!" })

    } catch (error) {
      console.log(error)
      return response.internalServerError(error.messages)
    }

  }

  public async edit({  response, params }: HttpContextContract) {


    const imobil = await Imobil.find(params.id)

    if (!imobil) {
      return response.internalServerError({ message: "Imóvel não existe!" })
    }

    return response.json({ imobil })

  }

  public async update({ request, response }: HttpContextContract) {

    const { id } = request.body()

    const imobil = await Imobil.find(id)

    const coverImage = request.file('file')

    try {


      const data = await request.validate(ImobilValidator)


      if (coverImage) {
        await Drive.delete(`imobil/${imobil?.image}`)
        await coverImage.moveToDisk('./imobil')
        var imageName = coverImage.fileName
      } else {
        var imageName = imobil?.image
      }

      await imobil?.merge({
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        category_id: data.category_id,
        image: imageName,
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        status: data.status,
        type: data.type,

        price: Number(data.price),
        rental_price: Number(data.rental_price),
        area: data.area,
        garage: data.garage,
        bedroom: data.bedroom,
        bathroom: data.bathroom,
        kitchen: data.kitchen,
        living_room: data.living_room,
        dining_room: data.dining_room,
        suites: data.suites,

        pool: data.pool,
        gym: data.gym,
        closet: data.closet,
        furnished_kitchen: data.furnished_kitchen,
        american_kitchen: data.american_kitchen,
        backyard: data.backyard,
        garden: data.garden,
        deck: data.deck,
        grill: data.grill,

      }).save()

      return response.json({ message: "Imóvel alterado com sucesso!" })

    } catch (error) {
      return response.internalServerError(error.messages)
    }

  }

  public async destroy({ request, response, params }: HttpContextContract) {

    const { page } = request.qs()

    const imobil = await Imobil.findOrFail(params.id)

    await Drive.delete(`imobil/${imobil?.image}`)

    await imobil?.delete()

    const imobils = await Imobil.query()
      .where("user_id", imobil.user_id)
      .orderBy("id", 'desc')
      .paginate(page, this.PAGE_LIMIT)

    return response.json({ message: "Imóvel deletado com sucesso", imobils })

  }
}
