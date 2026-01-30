const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema ({

    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    gender:String,
    country:String,
    age:Number

},{timestamps:true});
const User = mongoose.model("Customer", articleSchema);
module.exports = User;