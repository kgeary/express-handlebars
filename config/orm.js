const connection = require("./connection");

function query(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
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
    VALUES ("${burger.name}", ${burger.devoured})`);
}

function updateOne(burger) {
  return query(
    `UPDATE burgers 
    SET devoured=${burger.devoured} 
    WHERE id=${burger.id}`);
}

module.exports = {
  selectAll,
  insertOne,
  updateOne
}