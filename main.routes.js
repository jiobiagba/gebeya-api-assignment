// Connect all routes and app here
const router = require("express").Router()
const ItemRouter = require("./routes/item.routes").ItemRouter
const CartRouter = require("./routes/cart.routes").CartRouter
const UserRouter = require("./routes/user.routes").UserRouter
const myUtils = require("./util/helper-functions")


router.use("/users", UserRouter)

router.use("*", async (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization']
        if( !tokenHeader) throw "Token MUST be provided in authorization header"
        const permitted = await myUtils.isPermitted(tokenHeader)
        if (!permitted) throw "Access Denied"
        next()
    }
    catch (e) {
        return res.status(401).send({ error: true, message: e })
    }
})

router.use("/items", ItemRouter)
router.use("/carts", CartRouter)

exports.RoutesConnector = router