import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

  Route.post("/auth/login","AuthController.login")
  Route.post("/auth/signIn","AuthController.signIn")
  Route.get("/auth/checkToken","AuthController.checkToken")

  Route.group(()=>{
 
    Route.resource("/users","UsersController").except(['create','show'])
    
    Route.resource("/imobils","ImobilsController").except(['create','show'])
  
  }).middleware(['auth'])

}).prefix("api")