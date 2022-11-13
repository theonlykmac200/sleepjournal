const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sleep = require('./sleep');


const userSchema = new Schema({
    sleeps: [Sleep.schema],
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;