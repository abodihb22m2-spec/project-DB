const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema ({

    email: String,
    password: String

},{timestamps:true});
const Login = mongoose.model("Login", articleSchema);
module.exports = Login;