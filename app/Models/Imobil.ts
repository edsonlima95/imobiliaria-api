import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { string } from '@ioc:Adonis/Core/Helpers'


export default class Imobil extends BaseModel {

  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string
  @column()
  public slug: string
  @column()
  public description: string
  @column()
  public address: string
  @column()
  public number: number
  @column()
  public complement?: string
  @column()
  public neighborhood: string
  @column()
  public city: string
  @column()
  public state: string
  @column()
  public status?: boolean
  @column()
  public type: string
  @column()
  public price?: number
  @column()
  public rental_price?: number
  @column()
  public image: string

  @column()
  public area?: number
  @column()
  public garage?: number
  @column()
  public bedroom?: number
  @column()
  public bathroom?: number
  @column()
  public kitchen?: number
  @column()
  public living_room?: number
  @column()
  public dining_room?: number
  @column()
  public suites?: number

  @column()
  public pool?: boolean
  @column()
  public gym?: boolean
  @column()
  public closet?: boolean
  @column()
  public furnished_kitchen?: boolean
  @column()
  public american_kitchen?: boolean
  @column()
  public backyard?: boolean
  @column()
  public garden?: boolean
  @column()
  public deck?: boolean
  @column()
  public grill?: boolean

  @column()
  public category_id: number

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public user: BelongsTo<typeof User>

  @beforeSave()
  public static async slug(imobil: Imobil) {
    imobil.slug = string.dashCase(imobil.title)
  }

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
