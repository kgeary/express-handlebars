const express = require("express");
const exphbs = require("express-handlebars");
const burger_controller = require("./controllers/burgers_controller");

const PORT = process.env.PORT || 8080;
const app = express();

// Serve public assets (css, images, js)
app.use(express.static("public/assets"));

// Include support for Post Body and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
// Create a view engine for .handlebars files
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

// Set the view engine to handlebars in express
app.set("view engine", "handlebars");

// Setup the burger Routing
require("./controllers/burgers_controller")(app);

app.listen(PORT, function () {
  console.log("Listening at http://localhost:" + PORT);
});