const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema ({

    subject: String,
    message: String

},{timestamps:true});
const Feedback = mongoose.model("Feedback", articleSchema);
module.exports = Feedback;