const fs = require("fs");
const Burger = require("../models/burger.js");

// Run the Express Server
async function route(app) {
  console.log("STARTING BURGER APP ROUTER");
  const burger = new Burger();

  app.get("/", (req, res) => {
    burger.getAll().then(burgers => {
      res.render("index", {
        burgersNew: burgers.filter(i => !i.devoured),
        burgersOld: burgers.filter(i => i.devoured)
      })
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

module.exports = route;