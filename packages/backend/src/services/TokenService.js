const jwt = require("jsonwebtoken");
const db = require("../db");

module.exports = class AuthService {
  static async generateToken(username, email, id = null) {
    const token = jwt.sign({ username, email, id }, "authenticatejwt0123");
    return token;
  }

  static async isTokenValid(token) {
    try {
      const tokenInfo = await db.sequelize.query(
        "SELECT * FROM users_tokens WHERE id = $1 and date_logout = null",
        { bind: [token] }
      );
      return tokenInfo[0];
    } catch (error) {
      console.log(error);
    }
  }
};
