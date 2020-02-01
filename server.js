const express = require("express");
const exphbs = require("express-handlebars");
var db = require("./models"); // get a reference to the model

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

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, function () {
    console.log("Listening at http://localhost:" + PORT);
  });
})
