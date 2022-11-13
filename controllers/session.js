const express = require("express");
const tenndrRouter = require ("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const Sleep = require("../models/sleep.js");
const sessionRouter = express.Router();



sessionRouter.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser,
    });
});

sessionRouter.delete("/", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/sleep");
    });
});

sessionRouter.post("/", (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send("Wah Wanh! There is a db issue");
        } else if (!foundUser) {
            res.send("This user does not exist, register first!");
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect("/sleep");
            } else {
                res.send("password does not match, go back and try again");
            }
        }
    });
});

module.exports = sessionRouter;
