const router = require("express").Router()
const ItemCtrl = require("../controllers/item.controller")

router.post("/create", ItemCtrl.addItems)
router.get("/get-available", ItemCtrl.getAvailableItems)
router.get("/get-one-by-id/:id", ItemCtrl.getItemById)
router.put("/update-one-by-id/:id", ItemCtrl.updateItemById)
router.delete("/delete-one-by-id/:id", ItemCtrl.deleteItemById)

exports.ItemRouter = router