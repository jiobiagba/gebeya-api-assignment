
const CartModel = require("../models/cart.model").CartModel

const addToCart = async (req, res) => {
    try {
        const  data = req.body.data === "string" ? JSON.parse(req.body.data) : req.body.data
        
        // Not supplying a cartId is interpreted as creating a new cart.
        // If a cartId is supplied, however, the existing cart is updated.
        // Thus, this controller handles adding to cart and removing from cart
        const result  = req.query.cartId 
                ? await CartModel.findByIdAndUpdate(req.query.cartId, data, { new: true }) 
                : await CartModel.create(data)


        res.status(200).send({ error: false, message: "Cart Creation/ Update Successful", result: result })
    }
    catch (e) {
        res.status(400).send({ error: true, message: e })
    }
}

const cardDetails = async (req, res) => {
    try {
        res.status(200).send({
            error: false,
            message: "Card Details Successfully Fetched",
            result: await CartModel.findById(req.params.id).populate({
                path: "items.item_id",
                model: "Item"
            })
        })
    }
    catch (e) {
        res.status(400).send({ error: true, message: e })
    }
}

exports.addToCart = addToCart
exports.cardDetails = cardDetails