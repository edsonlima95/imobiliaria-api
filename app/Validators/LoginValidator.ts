import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    email: schema.string([
      rules.email(),
    ]),
    password: schema.string([rules.minLength(4)]),
  })

  public messages: CustomMessages = {
    'email.required': 'Email é obrigatório',
    'email': 'Email não tem um formato válido',
    'password.minLength': 'Senha deve conter no minimo 4 caracteres',
    'password.required': 'Senha é obrigatória',
  }
}
