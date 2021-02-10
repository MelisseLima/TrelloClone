const crypto = require("crypto");

module.exports = function generatedID(bytes) {
  let id = crypto.randomBytes(bytes).toString("HEX");

  return id;
};
