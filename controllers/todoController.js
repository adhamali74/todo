/** @format */

const bodyParser = require("body-parser");
var mongoose = require("mongoose");

// connecting to DB

mongoose.connect(
  "mongodb+srv://adhamali1907:alahly1907@todo.hf2todi.mongodb.net/test"
);

// creating schema
var todoSchema = new mongoose.Schema({
  item: String,
});

// creating model
var Todo = mongoose.model("Todo", todoSchema);

// // creating items in model
// var itemOne = Todo({ item: "buy some flowers" }).save(function (err) {
//   if (err) throw err;
//   console.log("Succesfully Saved");
// });

// var data = [
//   { item: "Ahly Match" },
//   { item: "walk with Shalaby" },
//   { item: "kick some coding ass" },
// ];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    // get items from mongodb and display it in the app.
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    // get items from app and add it to mongodb.
    var newItems = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function (req, res) {
    // delete the desired item from mongodb.
    Todo.find({ item: req.params.item.replace(/-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
