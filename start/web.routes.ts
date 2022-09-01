import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.get("/", "WebsController.index")

    Route.get("/imobil/:slug", "WebsController.imobilBySlug")

    Route.get("/imobil/category/:id", "WebsController.imobilByCategory")

    Route.get("/imobil/type/:type", "WebsController.imobilByType")

    Route.get("/imobil/image/:image", "WebsController.cover")

    Route.get("/imobil/filter/*", "WebsController.filter")

}).prefix("web")