import Route from '@ioc:Adonis/Core/Route'
import './web.routes'

Route.group(() => {

  Route.post("/auth/login", "AuthController.login")
  Route.post("/auth/signIn", "AuthController.signIn")
  Route.get("/auth/checkToken", "AuthController.checkToken")
  
  Route.get("/profile/:cover", "AuthController.cover")
  
  Route.group(() => {
    
    Route.get("/imobils/count/:id", "HomeController.home")

    Route.resource("/users", "UsersController").only(['index', 'update'])
    
    
    Route.resource("/imobils", "ImobilsController").except(['create', 'show'])
    
    Route.resource("/categories", "CategoriesController").except(['create', 'show'])
    
    
    

  }).middleware(['auth'])


}).prefix("api")