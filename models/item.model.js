const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
    name: String,
    vendor_name: String,
    photo: [
        String
    ],
    price: Number,
    detailed_description: String
},
{
    timestamps: { 
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const ItemModel = mongoose.model("Item", ItemSchema)

exports.ItemModel = ItemModel