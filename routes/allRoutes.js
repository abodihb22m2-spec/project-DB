const express = require('express');
const router = express.Router();
const User = require("../models/customerSchema");
const moment = require('moment');
const mongoose = require("mongoose");

// ====================
// MongoDB Connection
// ====================
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB connected"))
.catch(err => console.log("DB connection error:", err));

// ====================
// ROUTES
// ====================

// GET all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.render("index", { users: allUsers, moment: moment });
    } catch (err) {
        console.log("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    }
});

// GET add user page
router.get("/user/add.html", (req, res) => {
    res.render("user/add");
});

// GET edit user page
router.get("/user/edit.html", (req, res) => {
    res.render("user/edit");
});

// Redirect /user/user/add.html to add page
router.get("/user/user/add.html", (req, res) => {
    res.redirect("/user/add.html");
});

// GET single user by ID
router.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid user ID");
    }

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send("User not found");
        res.render("user/view", { Alldata: [user], moment: moment });
    } catch (err) {
        console.log("Error fetching user:", err);
        res.status(500).send("Error fetching user");
    }
});

// GET edit user by ID
router.get("/user/edit/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid user ID");
    }

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send("User not found");
        res.render("user/edit", { Alldata: [user], moment: moment });
    } catch (err) {
        console.log("Error fetching user:", err);
        res.status(500).send("Error fetching user");
    }
});

// ====================
// POST ROUTES
// ====================

// Add new user
router.post("/user/add.html", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect("/");
    } catch (err) {
        console.log("Error saving user:", err);
        res.status(500).send("Error saving user");
    }
});

// Search users
router.post("/search", async (req, res) => {
    try {
        const user = await User.find({
            $or: [
                { firstname: req.body.searchText.trim() },
                { lastname: req.body.searchText.trim() }
            ]
        });
        res.render("index", { users: user, moment: moment });
    } catch (err) {
        console.log("Error searching users:", err);
        res.status(500).send("Error searching users");
    }
});

// ====================
// DELETE ROUTE
// ====================
router.delete("/delete/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.log("Error deleting user:", err);
        res.status(500).send("Error deleting user");
    }
});

// ====================
// PUT ROUTE
// ====================
router.put("/user/edit/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/");
    } catch (err) {
        console.log("Error updating user:", err);
        res.status(500).send("Error updating user");
    }
});

module.exports = router;
