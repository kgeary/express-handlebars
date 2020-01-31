const fs = require("fs");
const Handlebars = require("handlebars");
const Burger = require("../models/burger.js");

const htmlIndex = fs.readFileSync("./views/index.handlebars");
const htmlMain = fs.readFileSync("./views/layouts/main.handlebars");
const templateIndex = Handlebars.compile(htmlIndex.toString());
const templateMain = Handlebars.compile(htmlMain.toString());

// Run the Express Server
async function route(app) {
  console.log("STARTING BURGER APP ROUTER");
  const burger = new Burger();

  app.get("/", (req, res) => {
    burger.getAll().then(burgers => {
      const dataLeft = { burgers: burgers.filter(i => !i.devoured), side: "left" };
      const dataRight = { burgers: burgers.filter(i => i.devoured), side: "right", eaten: true };
      const partialLeft = Handlebars.registerPartial("left", templateIndex(dataLeft))
      const partialRight = Handlebars.registerPartial("right", templateIndex(dataRight))
      res.send(templateMain({ left: partialLeft, right: partialRight }));
    });
  });

  app.post("/update", (req, res) => {
    burger.update(req.body.id, true).then(() => {
      res.redirect("/");
    });
  });

  app.post("/add", (req, res) => {
    burger.add(req.body.burger).then(() => {
      res.redirect("/");
    });
  });

  app.post("/clear", (req, res) => {
    burger.remove({ devoured: true }).then(() => {
      res.redirect("/");
    });
  });
}

module.exports = {
  route
}