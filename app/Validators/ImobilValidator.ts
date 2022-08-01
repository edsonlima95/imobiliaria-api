import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ImobilValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    title: schema.string(),
    file: schema.file.optional({
      size: '1mb',
      extnames: ["jpg", "png", "jpeg"]
    }, [rules.requiredWhen('id', '=', null)]),
    description: schema.string(),
    user_id: schema.number(),
    image: schema.string.optional(),
    address: schema.string(),
    number: schema.number(),
    complement: schema.string.optional(),
    neighborhood: schema.string(),
    city: schema.string(),
    state: schema.string(),
    status: schema.boolean.optional(),
    type: schema.string(),

    price: schema.number.optional(),
    rental_price: schema.number.optional(),
    area: schema.number.optional(),
    garage: schema.number.optional(),
    bedroom: schema.number.optional(),
    bathroom: schema.number.optional(),
    kitchen: schema.number.optional(),
    living_room: schema.number.optional(),
    dining_room: schema.number.optional(),
    suites: schema.number.optional(),

    pool: schema.boolean.optional(),
    gym: schema.boolean.optional(),
    closet: schema.boolean.optional(),
    furnished_kitchen: schema.boolean.optional(),
    american_kitchen: schema.boolean.optional(),
    backyard: schema.boolean.optional(),
    garden: schema.boolean.optional(),
    deck: schema.boolean.optional(),
    grill: schema.boolean.optional(),

  })


  public messages: CustomMessages = {

    "title.required": "Titulo é obrigatório",
    "description.required": "Descrição é obrigatório",
    "user_id.required": "Usuário é obrigatório",
    "address.required": "Endereço é obrigatório",
    "number.required": "Numero é obrigatório",
    "neighborhood.required": "Bairro é obrigatório",
    "city.required": "Cidade é obrigatório",
    "state.required": "Estado é obrigatório",
    "type.required": "Tipo é obrigatório",
    "image.required": "Imagen é obrigatória",
    "file.size": "Tamanho máximo do arquivo é de {{options.size}}",
    "file.extname": "Apenas os formatos {{options.extnames}} são válidos",
    "file.requiredWhen": "A imagem é obrigatória",
  }

}
