import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) { }

  
  public schema = schema.create({
    name: schema.string({}, [rules.alpha(), rules.minLength(3)]),
    email: schema.string({}, [
      rules.email(),
      
      rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(4)]),
  })


  public messages: CustomMessages = {
    'name.string': 'Nome deve conter apenas letras',
    'name.required': 'Nome é obrigatório',
    'name.minLength': 'Nome deve ter pelo menos 3 caracteres',
    'email.required': 'Email é obrigatório',
    'email.unique': 'Email já existe',
    'email': 'Email não tem um formato válido',
    'password.required': 'Senha é obrigatório',
    'password.minLength': 'Senha deve conter no minimo 4 caracteres'
  }
}
