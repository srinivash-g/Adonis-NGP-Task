 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema } from '@ioc:Adonis/Core/Validator'
import Student from 'App/Models/Student'

export default class StudentInfoAddsController {
//Insert Student
        public async create({request,response}:HttpContextContract) {   
            const newValidator=schema.create({
             stud_name:schema.string(),
             roll_no:schema.number()
           })
           const messages={'*': (field, rule) => {return `${rule} validation error on ${field}`}}
           const payload=await request.validate({schema:newValidator,messages})
           //return payload 
           const created=await Student.create(payload)
           return response.created({message:'Student Record has been inserted ',
                                    data:created
                                })
                                
            
       }

    }
