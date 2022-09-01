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

// creating items in model
var itemOne = Todo({ item: "buy some flowers" }).save(function (err) {
  if (err) throw err;
  console.log("Succesfully Saved");
});

var data = [
  { item: "Ahly Match" },
  { item: "walk with Shalaby" },
  { item: "kick some coding ass" },
];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    res.render("todo", { todos: data });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    data.push(req.body);
    res.json(data);
  });

  app.delete("/todo/:item", function (req, res) {
    data = data.filter(function (todo) {
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(data);
  });
};
