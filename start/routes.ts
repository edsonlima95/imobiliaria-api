import Route from '@ioc:Adonis/Core/Route'
import './web.routes'

Route.group(() => {

  Route.post("/auth/login", "AuthController.login")
  Route.post("/auth/signIn", "AuthController.signIn")
  Route.get("/auth/checkToken", "AuthController.checkToken")

  Route.group(() => {

    Route.get("/imobils/count/:id", "HomeController.home")

    Route.resource("/users", "UsersController").except(['create', 'show'])

    Route.resource("/imobils", "ImobilsController").except(['create', 'show'])
    
    Route.resource("/categories", "CategoriesController").except(['create', 'show'])


    Route.get("/profile/:cover", "AuthController.cover")


  }).middleware(['auth'])

}).prefix("api")