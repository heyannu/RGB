var mongoose = require("mongoose");
var passport_local = require('passport-local-mongoose');
var userSchema = new mongoose.Schema({
   username:String,
    email:String,
    highscore:Number,
});
userSchema.plugin(passport_local)
module.exports = mongoose.model("user", userSchema);