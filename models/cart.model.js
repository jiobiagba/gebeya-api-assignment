const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const CartSchema = new mongoose.Schema({
    items: [{
        item_id: { type: ObjectId, ref: "Item" },
        quantity: Number
    }]
},
{
    timestamps: { 
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const CartModel = mongoose.model("Cart", CartSchema)

exports.CartModel = CartModel