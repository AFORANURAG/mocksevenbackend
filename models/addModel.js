const mongoose = require("mongoose");
const addModel = mongoose.model("add",mongoose.Schema({
name:String,
description :String,
category:String,
image:String,
location:String,
postedAt:Date,
price:String
}))

module.exports = {addModel}