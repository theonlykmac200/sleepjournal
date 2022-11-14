const express = require("express")
const sleepRouter = express.Router()
const session = require("express-session")
const Sleep = require("../models/sleep")
const User = require("../models/user")

// index
sleepRouter.get("/", (req, res) => {
    if(req.session.currentUser) {
    User.findById(req.session.currentUser,(err, foundUser) => {
    res.render("sleep/dashboard.ejs", {
        sleep: foundUser.sleeps,
        currentUser: foundUser,
        user: foundUser,
    });
    });
    } else {
        res.render("sleep/index.ejs", {
            currentUser: req.session.currentUser,
            });
        } 
    });



// new morning
sleepRouter.get("/new_morning/", (req, res) => {
    res.render("sleep/new_morning.ejs", {
        currentUser: req.session.currentUser,
    });
});

sleepRouter.get("/new_night/", (req, res) => {
    res.render("sleep/new_night.ejs", {
        currentUser: req.session.currentUser,
    });
});
// new night
// sleepRouter.get("/new_night", (req, res) => {
//     res.render("sleep/new_night.ejs", {
//         currentUser: req.session.currentUser,
//     });
// });



//delete
sleepRouter.delete("/:id", (req, res) => {
    User.findById(req.session.currentUser, (err, foundUser) => {
        foundUser.sleeps.id(req.params.id).remove();
        foundUser.save((err, data) => {
            res.redirect("/sleep");
        });
    });
});


//update
sleepRouter.put("/:id", (req, res) => {
    //find this workout and update it
    Sleep.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedSleep) => {
            
            //find this user and push the updated workout into their workouts array
    User.findOne({ "sleeps._id": req.params.id }, (err, foundUser) => {
        foundUser.sleeps.id(req.params.id).remove();
        foundUser.sleeps.push(updatedSleep);
        foundUser.save((err, data) => {
            res.redirect("/sleep/");
        });
    }
    );
    }
    );
});

    


 
//create
sleepRouter.post("/", (req, res) => {
    User.findById(req.session.currentUser, (err, foundUser) => {
        Sleep.create(req.body, (err, createdSleep) => {
            foundUser.sleeps.push(createdSleep)
            foundUser.save()
            res.redirect("/sleep")

    })
        
            })
        })





//edit
sleepRouter.get("/:id/edit", (req, res) => {
    Sleep.findById(req.params.id, (err, foundSleep) => {
        res.render("sleep/edit.ejs", {
            currentUser: req.session.currentUser,
            sleep: foundSleep,
        });
        })
    });

sleepRouter.get("/new_night/:id/edit", (req, res) => {
    Sleep.findById(req.params.id, (err, foundSleep) => {
        res.render("sleep/new_night.ejs", {
            currentUser: req.session.currentUser,
            sleep: foundSleep,
        });
        })
    });
    

//show  // I feel like tenndr and user are flipped here but I figure out what it should be and its just throwing the same error either way that still works so no point in changing it. 
sleepRouter.get("/:id", (req, res) => {
User.findById(req.session.currentUser, (err, foundUser) => {
    Sleep.findById(req.params.id, (err, foundSleep) => {
        res.render("sleep/show.ejs", { 
            sleep: foundSleep,
            currentUser: foundUser,
        })
    })
})
})


module.exports = sleepRouter;
