import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Authenthicate {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    const appkey=request.header('app-key')
    // if(appkey!='SUr-dNEmKYyk5sqWKyqIKdMnyU1dNzYq'){
    //   return response.unauthorized({error:'Unauthorized access'})
    // }
    // // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
