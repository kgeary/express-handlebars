const db = require("../models");

// Run the Express Server
async function route(app) {
  console.log("STARTING BURGER APP ROUTER");

  app.get("/", (req, res) => {
    db.Burger.findAll({ order: [['updatedAt', 'DESC']] }).then(burgers => {
      /* Had to map the objects to keep handlebars working */
      const burgersMapped = burgers.map(i => {
        return {
          id: i.id,
          burger_name: i.burger_name,
          devoured: i.devoured,
          updatedAt: i.updatedAt
        }
      });
      res.render("index", {
        burgersNew: burgersMapped.filter(i => !i.devoured),
        burgersOld: burgersMapped.filter(i => i.devoured),
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