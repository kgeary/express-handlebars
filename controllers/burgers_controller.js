const express = require("express");
const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");
const Burger = require("../models/burger.js");

const PORT = 8080;
const app = express();
const path_public = path.resolve("../public"); // Need an absolute path

const htmlIndex = fs.readFileSync("./views/index.handlebars");
const htmlMain = fs.readFileSync("./views/layouts/main.handlebars");
const templateIndex = Handlebars.compile(htmlIndex.toString());
const templateMain = Handlebars.compile(htmlMain.toString());

// Run the Express Server
async function router() {
  console.log("STARTING ROUTER");
  const burger = new Burger();

  app.use(express.static("public"));
  app.use(express.static("public/assets/"));
  app.use(express.static("public/assets/css"));
  app.use(express.static("public/assets/img"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (req, res) => {
    burger.getAll().then(burgers => {
      const dataLeft = { burgers: burgers.filter(i => !i.devoured), side: "left", notDevoured: true };
      const dataRight = { burgers: burgers.filter(i => i.devoured), side: "right", notDevoured: false };
      const left = Handlebars.registerPartial("left", templateMain(dataLeft))
      const right = Handlebars.registerPartial("right", templateMain(dataRight))
      res.send(templateIndex({ left, right }));
    });
  });

  app.post("/update/:id", (req, res) => {
    burger.update(req.params.id, 1).then(function () {
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