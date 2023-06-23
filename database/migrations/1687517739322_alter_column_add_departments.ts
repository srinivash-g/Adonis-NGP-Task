import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.alterTable('students',(table)=>{
      table.integer('dept_id')
    })  }

  public async down () {
    this.schema.alterTable('students',(table)=>{
      table.dropColumn('dept_id')
    })
  }
}
