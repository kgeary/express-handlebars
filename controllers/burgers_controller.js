const db = require("../models");

// Run the Express Server
async function route(app) {
  console.log("STARTING BURGER APP ROUTER");

  app.get("/", (req, res) => {
    // Use raw: true to prevent wrapping the object (to keep handlebars happy)
    db.Burger.findAll({ order: [['updatedAt', 'DESC']], raw: true }).then(burgers => {
      res.render("index", {
        burgersNew: burgers.filter(i => !i.devoured),
        burgersOld: burgers.filter(i => i.devoured),
      });
    });
  });

  app.post("/update", (req, res) => {
    db.Burger.update({ devoured: true }, { where: { id: req.body.id } }).then(() => {
      res.redirect("/");
    });
  });

  app.post("/add", (req, res) => {
    db.Burger.create(req.body).then((data) => {
      res.redirect("/");
    });
  });

  app.post("/clear", (req, res) => {
    db.Burger.destroy({ where: { devoured: true } }).then(() => {
      res.redirect("/");
    });
  });
}

module.exports = route;