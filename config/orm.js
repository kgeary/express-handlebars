const connection = require("./connection");

function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    })
  })
}

function selectAll() {
  return query("SELECT * FROM burgers")
}

function insertOne(burger) {
  return query(
    `INSERT INTO burgers (burger_name, devoured) 
    VALUES (?,?)`,
    [burger.name, burger.devoured]);
}

function updateOne(burger) {
  return query(
    `UPDATE burgers 
    SET devoured=? 
    WHERE id=?`,
    [burger.devoured, burger.id]);
}

function remove(options) {
  let keys = Object.keys(options);
  let where = keys.map(key => `${key}=${options[key]}`).join(", ");
  return query(
    `DELETE FROM burgers
    WHERE ${where}`
  )
}

module.exports = {
  selectAll,
  insertOne,
  updateOne,
  remove,
}