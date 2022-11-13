const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const userRouter = express.Router();


userRouter.get("/new", (req, res) => {
    res.render("user/new_user.ejs", {
        currentUser: req.session.currentUser,
    });
});


userRouter.post("/", (req, res) => {
    console.log("this is the req.body", req.body);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        console.log(err);
        res.redirect("/session/new");
    });
})

module.exports = userRouter;