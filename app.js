const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const allRoutes = require("./routes/allRoutes");


mongoose.connect(
  "mongodb+srv://Abdulrahman:5u9JMQunADtIIPi2@cluster0.geyxsln.mongodb.net/?appName=Cluster0"
)
.then(() => console.log("Connected successfully"))
.catch(err => console.log("DB connection error:", err));

app.set("view engine", "ejs");

app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));


app.use(allRoutes);