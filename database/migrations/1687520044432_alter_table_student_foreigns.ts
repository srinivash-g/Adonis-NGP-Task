import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.alterTable('students',(table)=>{
      table.foreign('dept_id').references('departments.dep_id')
    })
    }
  

  public async down () {
    this.schema.alterTable('students',(table)=>{
      table.dropForeign('dept_id')
  })
}
}

