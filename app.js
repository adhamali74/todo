/** @format */

var express = require("express");
var app = express();
var todoController = require("./controllers/todoController");

app.set("view engine", "ejs");

app.use(express.static("./public")); //middleware

todoController(app);

app.listen(3000);
console.log("Server is running on port 3000");
