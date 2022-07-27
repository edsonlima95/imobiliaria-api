import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

  Route.post("/auth/login","AuthController.login")
  Route.post("/auth/signIn","AuthController.signIn")
  Route.get("/auth/checkToken","AuthController.checkToken")

  Route.resource("/users","UsersController").except(['create','show'])

}).prefix("api")