const router = require("express").Router()
const CartCtrl = require("../controllers/cart.controller")

router.post("/add-to-cart", CartCtrl.addToCart)
router.get("/cart-details/:id", CartCtrl.cardDetails)


exports.CartRouter = router