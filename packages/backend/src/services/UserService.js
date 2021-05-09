const db = require("../db");

module.exports = class UserService {
  static async findUser(username, password) {
    try {
      const user = await db.sequelize.query(
        `SELECT *
            FROM public.users
            WHERE username = $1 and
                  "password" = $2`,
        { bind: [username, password] }
      );

      return { data: user[0][0], status: 200 };
    } catch (error) {
      return {
        data: {
          message: "Usuário ou senha incorreta.",
        },
        status: 500,
      };
    }
  }
};
