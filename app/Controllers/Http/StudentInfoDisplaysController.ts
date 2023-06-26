import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Student from 'App/Models/Student'

export default class StudentInfoDisplaysController {
//Display all
public async fetchall({response}:HttpContextContract) {
    const details=await Student.all()
    if(details){
    return response.ok({data:details,message:'Fetched all data'})
    }
    else{
        return response.ok({message:'No Record available'})
        
    }
    }

//Display only specific id
    public async findById({response,params}:HttpContextContract) {    
        const details=await Student.findBy("stud_id",params.id)
        // if(isNaN(params.id)){
        //     return response.notFound({message:'Student ID details found'})
        // }
        // else 
        if(details){
        return response.accepted({data:details,message:'Student ID details found'})
        }
        else{
            return response.notFound({ message: 'The Student ID mentioned is not available' })
           
            
        }
        

    }
//Insert Student

    public async createDirectMethod({request,response}:HttpContextContract) {  
        const newValidator=schema.create({
            stud_name:schema.string(),
            roll_no:schema.number()
          })
          const messages={'*': (field, rule) => {return `${rule} validation error on ${field}`}}
          const payload=await request.validate({schema:newValidator,messages}) 
          const student = new Student()
    
    student.stud_name = payload.stud_name
    student.roll_no = payload.roll_no
    
    await student.save()
    return response.created({message:'Student Record has been inserted ',
                             data:student})

    }
//delete the student details

    public async delete({response,params}:HttpContextContract) {   
       const record=await Student.findBy("stud_id",params.id)
        if(record){
        record.delete()
       // return 'Deleted ';
        return response.ok({data:record,message:'Record Successfully deleted'})
       }
       
       else{
        return response.notFound({message:'The Student ID mentioned is not available'})
       }       
       
   }
//update the student details

   public async update({request,response,params}:HttpContextContract) {   
    const newValidator=schema.create({
     stud_name:schema.string(),
     roll_no:schema.number()
   })
   const payload=await request.validate({schema:newValidator})
   //return payload 
   const details_update = await Student.findOrFail(params.id)
   if(details_update){
   details_update.stud_name=payload.stud_name
   details_update.roll_no=payload.roll_no
   await details_update.save()

   return response.ok({data:details_update,message:'Record updated Successfully'})
   }
   else {
    return response.notFound({message:'The Student ID mentioned is not available'})
   }  
}
    

}
