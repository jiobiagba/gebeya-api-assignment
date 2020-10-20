const router = require("express").Router()
const UserCtrl = require("../controllers/user.controller")

router.post("/register", UserCtrl.register)
router.post("/login", UserCtrl.logIn)


exports.UserRouter = router