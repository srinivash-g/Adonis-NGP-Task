/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/


import Route from '@ioc:Adonis/Core/Route'
//import EmployeeInfosController from 'App/Controllers/Http/EmployeeInfosController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
Route.post('/insertstudent','StudentInfoAddsController.create')

Route.get('/Displayall','StudentInfoDisplaysController.fetchall')

Route.get('/insertbymodel','StudentInfoDisplaysController.create')

Route.get('/findbyid/:id','StudentInfoDisplaysController.findById')

Route.delete('/deletebyid/:id','StudentInfoDisplaysController.delete')

Route.get('/insertdirect','StudentInfoDisplaysController.createDirectMethod')

Route.put('/updatedetails/:id','StudentInfoDisplaysController.update')

Route.get('/deptadd','DepartmentDetailsController.addDepartment')

Route.get('/getall','DepartmentDetailsController.displayAllDetails')

Route.get('/dispdept','DepartmentDetailsController.fetchallDept')

Route.patch('/updatedept/:id','DepartmentDetailsController.update')

Route.delete('/deletedept/:id','DepartmentDetailsController.delete')

Route.get('/dispalldept/:id','DepartmentDetailsController.displayAllDetailsbyId')

Route.get('/dispbysearch/','DepartmentDetailsController.displayAllDetailsbySearch')

Route.get('/dispbysearchandid/:id','DepartmentDetailsController.displayAllDetailsbySearchandId')


}).middleware('Authenthicate')






