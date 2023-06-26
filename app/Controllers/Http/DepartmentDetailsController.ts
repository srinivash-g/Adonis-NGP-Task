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
    return response.created({message:'Department Record has been inserted ',
                             data:department})
                             

    }
    public async update({request,response,params}:HttpContextContract) {   
      const newValidator=schema.create({
       depname:schema.string(),
     })
     const payload=await request.validate({schema:newValidator})
     //return payload 
     const details_update = await Department.findOrFail(params.id)
     if(details_update){
     details_update.depName=payload.depname
     await details_update.save()
     return response.ok({data:details_update,message:'Record updated successfully'})
     }
     else {
      return response.notFound({message:'The Department ID mentioned is not available'})
     }  
  }
  public async delete({response,params}:HttpContextContract) {   
    const record=await Department.findBy("dep_id",params.id)
     if(record){
     record.delete()
    // return 'Deleted ';
     return response.ok({data:record,message:'Record Successfully deleted'})
    }
    
    else{
     return response.notFound({message:'The Department ID mentioned is not available'})
    }       
    
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

