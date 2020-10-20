// Connect all routes and app here
const router = require("express").Router()
const ItemRouter = require("./routes/item.routes").ItemRouter

router.use("/items", ItemRouter)

exports.RoutesConnector = router