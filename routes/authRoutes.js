const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController"); 
const jwt = require("jsonwebtoken"); 
const Account = require("../models/signupScema"); 
require('dotenv').config();

const checkIfUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.password_jwt, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                try {
                    const loginUser = await Account.findById(decodedToken.id);
                    res.locals.user = loginUser;
                    next();
                } catch (error) {
                    res.locals.user = null;
                    next();
                }
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

router.use(checkIfUser);

router.get("/welcome", authController.welcome); 
router.get("/content", authController.content);
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

module.exports = router;