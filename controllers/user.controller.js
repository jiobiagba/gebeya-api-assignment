const UserModel = require("../models/user.model").UserModel
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req, res) => {
    try { 
        const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body.data
        // Hash Password
        if( !data.password || !data.username) throw "username AND password fields required."
        data.password = bcrypt.hashSync(data.password, 10)
        const result = await UserModel.create(data)

        res.status(201).send({
            error: false,
            message: "User Successfully Added",
            result: {
                id: result._id,
                name: result.name,
                username: result.username,
            }
        })
    }
    catch (e) {
        res.status(400).send({ error: true, message: e })
    }
}

const logIn = async(req, res) => {
    try { 
        const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body.data

        // Assertain user is present and has a correct password
        const user = await UserModel.findOne({ username: data.username })
        if (!user) throw "User not Found"
        const correctPassword = bcrypt.compareSync(data.password, user.password)
        if( !correctPassword) throw "Incorrect password supplied"

        // Sign the user's main details and use it to generate a token
        const tokenData = { username: user.username, _id: user._id }
        const token = jwt.sign(tokenData, String(process.env.E_SECRET), {
            expiresIn: "5h"
        })

        res.status(200).send({
            error: false,
            message: "Login Successful",
            result: token
        })
    }
    catch (e) {
        res.status(400).send({ error: true, message: e })
    }
}

exports.register = register
exports.logIn = logIn