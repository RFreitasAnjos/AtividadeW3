const path = require("path");

module.exports = {
  config: path.resolve(__dirname, "config", "db.js"),
  "migrations-path": path.resolve(__dirname, "db", "index.js", "migrations"),
};
