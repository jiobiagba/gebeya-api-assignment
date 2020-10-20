
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model").UserModel

const isPermitted = async (token) => {
    const payload = jwt.verify(token, String(process.env.E_SECRET))
    const user = await UserModel.findOne({
        username: payload.username,
        _id: payload._id
    })
    if( !user) {
        return false
    }
    return true
}

exports.isPermitted = isPermitted