const fs = require("fs");
const express = require("express");
const Handlebars = require("handlebars");
const Burger = require("../models/burger.js");

const PORT = process.env.PORT || 8080;
const app = express();

const htmlIndex = fs.readFileSync("./views/index.handlebars");
const htmlMain = fs.readFileSync("./views/layouts/main.handlebars");
const templateIndex = Handlebars.compile(htmlIndex.toString());
const templateMain = Handlebars.compile(htmlMain.toString());

// Run the Express Server
async function router() {
  console.log("STARTING BURGER APP ROUTER");
  const burger = new Burger();

  app.use(express.static("public"));
  app.use(express.static("public/assets/"));
  app.use(express.static("public/assets/css"));
  app.use(express.static("public/assets/img"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (req, res) => {
    burger.getAll().then(burgers => {
      const dataLeft = { burgers: burgers.filter(i => !i.devoured), side: "left" };
      const dataRight = { burgers: burgers.filter(i => i.devoured), side: "right" };
      const partialLeft = Handlebars.registerPartial("left", templateMain(dataLeft))
      const partialRight = Handlebars.registerPartial("right", templateMain(dataRight))
      res.send(templateIndex({ left: partialLeft, right: partialRight }));
    });
  });

  app.post("/update/:id", (req, res) => {
    burger.update(req.params.id, true).then(function () {
      res.redirect("/");
    });
  });

  app.post("/add", (req, res) => {
    burger.add(req.body.burger).then(function () {
      res.redirect("/");
    });
  });


  app.listen(PORT, function () {
    console.log("Listening at http://localhost:" + PORT);
  });
}

module.exports = {
  router
}