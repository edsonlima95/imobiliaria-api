import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.get("/", "WebsController.index")

    Route.get("/imobil/image/:image", "WebsController.cover")

    Route.get("/imobil/:slug", "WebsController.imobilBySlug")

}).prefix("web")