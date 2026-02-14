const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");

var methodOverride = require('method-override');
app.use(methodOverride('_method'));
require('dotenv').config();


// Cookie Parser Middleware
var cookieParser = require('cookie-parser');
app.use(cookieParser());


mongoose.connect(
  process.env.MONGODB_URL
)
.then(() => console.log("Connected successfully"))
.catch(err => console.log("DB connection error:", err));

app.set("view engine", "ejs");

app.listen(port, () => console.log(`Server running at http://localhost:${port}/welcome`));




app.use(authRoutes);
app.use(customerRoutes);