const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.set("view engine", "ejs");

// Routes
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use(authRoutes);
app.use(customerRoutes);

// الاتصال بقاعدة البيانات وتفعيل السيرفر
const dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected successfully to MongoDB Atlas");
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch(err => {
    console.log("DB connection error:", err);
  });