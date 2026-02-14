const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController"); // ملف الكنترول الجديد
const requireAuth = require("../middleware/middleware").requireAuth;

// تطبيق حماية تسجيل الدخول على جميع هذه المسارات
router.use(requireAuth);

// مسارات إدارة العملاء والبحث
router.get("/home", userController.getHome);
router.post("/send-feedback", userController.postFeedback);
router.get("/user/add.html", userController.getAddUser);
router.post("/user/add.html", userController.postAddUser);
router.get("/user/:id", userController.getViewUser);
router.get("/user/edit/:id", userController.getEditUser);
router.put("/user/edit/:id", userController.putEditUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/search", userController.postSearch);

module.exports = router;