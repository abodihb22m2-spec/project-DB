const User = require("../models/customerSchema");
const moment = require('moment');
const Feedback = require("../models/feedbackSchema");

const getHome = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.render("index", { 
            users: allUsers, 
            moment: moment, 
            user: res.locals.user 
        });
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
};

const postFeedback = async (req, res) => {
    try {
        if (res.locals.user) {
            const newFeedback = new Feedback({
                user: res.locals.user._id,
                message: req.body.message
            });
            await newFeedback.save();
            res.redirect("/welcome");
        } else {
            res.render("auth/login", { err: "Please log in to send feedback", error: null });
        }
    } catch (err) {
        res.status(500).send("Error saving feedback");
    }
};

// عرض صفحة إضافة عميل جديد
const getAddUser = (req, res) => {
    res.render("user/add", { user: res.locals.user });
};

// معالجة إضافة عميل جديد
const postAddUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect("/home");
    } catch (err) {
        res.status(500).send("Error saving user");
    }
};

// عرض بيانات عميل محدد
const getViewUser = async (req, res) => {
    try {
        const customer = await User.findById(req.params.id);
        if (!customer) return res.status(404).send("User not found");
        res.render("user/view", { 
            Alldata: [customer], 
            moment: moment, 
            user: res.locals.user 
        });
    } catch (err) {
        res.status(500).send("Error fetching user");
    }
};

// عرض صفحة تعديل بيانات عميل
const getEditUser = async (req, res) => {
    try {
        const customer = await User.findById(req.params.id);
        if (!customer) return res.status(404).send("User not found");
        res.render("user/edit", { 
            Alldata: [customer], 
            moment: moment, 
            user: res.locals.user 
        });
    } catch (err) {
        res.status(500).send("Error");
    }
};

// معالجة تحديث بيانات العميل
const putEditUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/home");
    } catch (err) {
        res.status(500).send("Error updating user");
    }
};

// حذف عميل
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/home");
    } catch (err) {
        res.status(500).send("Error deleting user");
    }
};

// البحث عن العملاء
const postSearch = async (req, res) => {
    try {
        const userResult = await User.find({
            $or: [
                { firstname: req.body.searchText.trim() },
                { lastname: req.body.searchText.trim() }
            ]
        });
        res.render("index", { 
            users: userResult, 
            moment: moment, 
            user: res.locals.user 
        });
    } catch (err) {
        res.status(500).send("Error searching");
    }
};

module.exports = {
    getHome,
    postFeedback,
    getAddUser,
    postAddUser,
    getViewUser,
    getEditUser,
    putEditUser,
    deleteUser,
    postSearch
};