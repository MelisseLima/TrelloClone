const jwt = require("jsonwebtoken");
const db = require("../db");

module.exports = class AuthService {
  static async generateToken(username, email, id) {
    const expireDate = new Date(new Date().valueOf());

    const token = jwt.sign({ username, email, id }, "authenticatejwt0123", {
      expiresIn: 3600 * 24,
    });
    await db.sequelize.query(
      `INSERT INTO public.users_token
      (id, users_id, date_login, date_expire)
      VALUES($1, $2, $3, $4) returning *;
      `,
      {
        bind: [
          token,
          id,
          expireDate.toISOString(),
          new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        ],
      }
    );

    return token;
  }

  static async getTokenData(token) {
    try {
      const parsed = token.split("Bearer ").join("");
      const decoded = jwt.verify(parsed, "authenticatejwt0123");
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }

  static async isTokenValid(token) {
    try {
      const tokenInfo = await db.sequelize.query(
        "SELECT * FROM users_tokens WHERE id = $1",
        { bind: [token] }
      );
      return tokenInfo[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(token) {
    try {
      const dateLogout = new Date().toISOString();
      const updateToken = await db.sequelize.query(
        `UPDATE public.users_token
            SET date_logout=$1
         WHERE id=$2 and date_logout is null returning *`,
        { bind: [dateLogout, token] }
      );

      if (updateToken[1].rowCount === 0) {
        return { message: "Sessão não encontrada", code: 401 };
      }
      return { message: "Usuário deslogado com sucesso.", code: 401 };
    } catch (error) {
      return { message: error.message, code: 401 };
    }
  }

  static async createUser(username, password, email, name) {
    try {
      const user = await db.sequelize.query(
        `INSERT
                  into
                  public.users (
                  "name",
                  "password",
                  email,
                  isactive,
                  username)
              values(
              $1,
              $2,
              $3,
              true,
              $4) returning *`,
        { bind: [name, password, email, username] }
      );
      return { data: user[0][0], status: 200 };
    } catch (error) {
      return {
        data: {
          message:
            "Erro ao criar usuário verifique os dados e tente novamente.",
        },
        status: 500,
      };
    }
  }
};
