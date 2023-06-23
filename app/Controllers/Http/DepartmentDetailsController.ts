import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema} from '@ioc:Adonis/Core/Validator'
import Department from 'App/Models/Department'
import Student from 'App/Models/Student'


export default class DepartmentDetailsController {
    public async addDepartment({request,response}:HttpContextContract) {  
        const newValidator=schema.create({
            depname:schema.string(),
          })
          const messages={'*': (field, rule) => {return `${rule} validation error on ${field}`}}
          const payload=await request.validate({schema:newValidator,messages}) 
          const department =new Department()
    
    department.depName = payload.depname
    
    await department.save()
    return response.created({message:'Student Record has been inserted ',
                             data:department})
                             

    }

    public async displayAllDetails() { 
    const student = await Student.query()

    
    .select('departments.dep_name')
    .select('students.*')
    .from('students')
  .join('departments', 'students.dept_id', '=', 'departments.dep_id')

  const result = student.map((s) => {
    return {
      stud_id: s.$attributes.stud_id,
      stud_name: s.$attributes.stud_name,
      roll_no: s.$attributes.roll_no,
      dept_id: s.$attributes.dept_id,
      dept_name: s.$extras.dep_name
    };
  });
  

  return result
  
 







}
}

