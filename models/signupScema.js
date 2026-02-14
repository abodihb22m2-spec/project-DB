const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const articleSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

articleSchema.pre("save", async function () {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

const Account = mongoose.model("Account", articleSchema);
module.exports = Account;