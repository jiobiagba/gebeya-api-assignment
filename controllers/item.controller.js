const ItemModel = require("../models/item.model").ItemModel


const addItems = async (req, res) => {
    try {
        res.status(201).send({
            error: false,
            message: "Item(s) Added Successfully",
            result: await ItemModel.create(
                typeof req.body.data === "string" ?
                JSON.parse(req.body.data) :
                req.body.data
            )
        })
    }
    catch(e) {
        res.status(400).send({ error: true, message: e })
    }
}

const getAvailableItems = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 100,
            page = req.query.page ? parseInt(req.limit.page) : 0

        res.status(200).send({
            error: false,
            message: "Item(s) Added Fetched",
            result: await ItemModel.find({ _id: { $exists: true } })
                    .sort({ price: -1 })
                    .skip(limit * page)
                    .limit(limit)
        })
    }
    catch(e) {
        res.status(400).send({ error: true, message: e })
    }
}

exports.addItems = addItems
exports.getAvailableItems = getAvailableItems