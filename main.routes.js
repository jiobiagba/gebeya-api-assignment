// Connect all routes and app here
const router = require("express").Router()
const ItemRouter = require("./routes/item.routes").ItemRouter
const CartRouter = require("./routes/cart.routes").CartRouter

router.use("/items", ItemRouter)
router.use("/carts", CartRouter)

exports.RoutesConnector = router