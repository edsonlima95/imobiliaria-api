import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Imobil from 'App/Models/Imobil'
import Drive from '@ioc:Adonis/Core/Drive'
import ImobilValidator from 'App/Validators/ImobilValidator'

export default class ImobilsController {

  public async index({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {

    // const data = request.body()

    // console.log(data)


    try {
      const coverImage = request.file('file')

      const data = await request.validate(ImobilValidator)

      await coverImage?.moveToDisk('./imobil')

      await Imobil.create({
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        image: coverImage?.fileName,
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        status: data.status,
        type: data.type,

        price: data.price,
        rental_price: data.rental_price,
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

  public async edit({ request, response }: HttpContextContract) {

    const { id } = request.params()

    const imobil = await Imobil.find(id)

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
        image: imageName,
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        status: data.status,
        type: data.type,

        price: data.price,
        rental_price: data.rental_price,
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

  public async destroy({ }: HttpContextContract) { }
}
