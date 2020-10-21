
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const MainRouter = require("./main.routes").RoutesConnector

const port = process.env.PORT || 5000

// Mongoose Connection
mongoose.connect(
    process.env.LIVECASE,
    {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    },
    (e) => {
        if (e) {
            console.error("\nError in starting application:   ", e.stack)
            process.exit(1)
        }
    }
)

// App set up
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", MainRouter)

app.use("*", (req, res) => {
    res.status(404).send({
        error: true,
        message: "Route not found"
    })
})

app.listen(port, () => {
    console.log(`App server running on port ${port}`)
})

// Export app for testing purposes
exports.app = app