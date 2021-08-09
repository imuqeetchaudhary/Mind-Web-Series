const express = require("express")
const bodyParser = require("body-parser")
const dbConnect = require("./db/connection");
const user = require("./routes/user")
const cors = require("cors")

dbConnect();
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.json({ message: "Mind Web Series Rest Api" })
})

app.use("/user", user)

module.exports = { app }