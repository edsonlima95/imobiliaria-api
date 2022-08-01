import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'imobils'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').notNullable()

      table.string('title',255).notNullable()
      table.string('description',255).notNullable()
      table.string('address',255).notNullable()
      table.integer('number',255).notNullable()
      table.string('complement',255).nullable()
      table.string('neighborhood',255).notNullable()
      table.string('city',255).notNullable()
      table.string('state',255).notNullable()
      table.boolean('status').nullable().defaultTo(1)
      table.string('type',255).notNullable()
      table.decimal('price',10,2).nullable()
      table.decimal('rental_price',10,2).nullable()
      table.string('image',255).notNullable()

      table.integer('area').nullable()
      table.integer('garage').nullable()
      table.integer('bedroom').nullable()
      table.integer('bathroom').nullable()
      table.integer('kitchen').nullable()
      table.integer('living_room').nullable()
      table.integer('dining_room').nullable()
      table.integer('suites').nullable()

      table.boolean('pool').nullable()
      table.boolean('gym').nullable()
      table.boolean('closet').nullable()
      table.boolean('furnished_kitchen').nullable()
      table.boolean('american_kitchen').nullable()
      table.boolean('backyard').nullable()
      table.boolean('garden').nullable()
      table.boolean('deck').nullable()
      table.boolean('grill').nullable()


      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
