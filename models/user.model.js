const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: { 
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const UserModel = mongoose.model("User", UserSchema)

exports.UserModel = UserModel