const express = require("express");
const burger_controller = require("./controllers/burgers_controller");

const PORT = process.env.PORT || 8080;
const app = express();

// Serve CSS and Images folders
app.use(express.static("public"));
app.use(express.static("public/assets"));
app.use(express.static("public/assets/css"));
app.use(express.static("public/assets/img"));

// Include support for Post Body and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup the burger Routing
burger_controller.route(app);

app.listen(PORT, function () {
  console.log("Listening at http://localhost:" + PORT);
});