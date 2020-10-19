const router = require("express").Router()
const ItemCtrl = require("../controllers/item.controller")

router.post("/create", ItemCtrl.addItems)
router.get("/get-available", ItemCtrl.getAvailableItems)

exports.ItemRouter = router