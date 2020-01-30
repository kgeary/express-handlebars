const orm = require("../config/orm");

class Burger {
  constructor() {
    // No properties yet.
  }

  async getAll() {
    try {
      const res = await orm.selectAll();
      return res;
    } catch (err) {
      console.log("An Error Occurred!");
      console.debug(err);
    }
  }

  async add(name) {
    try {
      const res = await orm.insertOne({ name, devoured: false });
      return res.insertId;
    }
    catch (err) {
      console.log("An Error Occurred!");
      console.debug(err);
    }
  }

  async update(id, devoured) {
    try {
      const res = await orm.updateOne({ id, devoured });
      console.debug("Rows Changed", res.affectedRows);
    } catch (err) {
      console.log("An Error Ocurred!");
      console.debug(err);
    }
  }
}

module.exports = Burger;