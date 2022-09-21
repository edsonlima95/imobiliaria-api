import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'
import Drive from '@ioc:Adonis/Core/Drive'

export default class UsersController {

  public async index({ request, response }: HttpContextContract) {

    const { user_id } = request.qs()

    const user = await User.find(user_id)

    return response.json({ user })

  }

  public async update({ request, response, params }: HttpContextContract) {

    const data = request.body()

    const cover = request.file('file')
   
    const user = await User.findOrFail(params.id)

    try {

      const postSchema = schema.create({
        file: schema.file.optional({
          size: '1mb',
          extnames: ['jpg', 'jpeg', 'png'],
        }),
      })

      const payload = await request.validate({
        schema: postSchema, messages: {
          'file.extname': 'O arquivo deve conter um dos seguintes formatos {{ options.extnames }}',
        }
      })

      if (cover) {
        await Drive.delete(`user/${user?.cover}`)
        await payload.file?.moveToDisk('./user')
        var imageName = payload.file?.fileName
      } else {
        var imageName = user?.cover
      }

      const newUser = await user.merge({
        name: data.name,
        email: data.email,
        password: data.password ? data.password : user.password,
        cover: imageName,

      }).save()

      return response.json({ message: "Perfile alterado com sucesso", user: newUser })

    } catch (error) {
      return response.internalServerError(error.messages)

    }
  }

}
