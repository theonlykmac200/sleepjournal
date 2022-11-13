const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const methodOverride = require("method-override")
const sleepController = require("./controllers/sleep")
const userController = require("./controllers/user")
const sessionController = require("./controllers/session")


require('dotenv').config();
const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })


const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))
    app.use(express.urlencoded({extended: true}))
    app.use(
      session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
      })
    )
    app.use(methodOverride("_method"))
    app.use("/sleep", sleepController)
    app.use("/users", userController)
    app.use("/sessions", sessionController)
    app.use(express.static("public"))
    
    app.get("/", (req, res) => {res.redirect("/sleep")})

app.listen(PORT, () => {
    console.log('dream a little dream of me');
})
