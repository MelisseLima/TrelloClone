const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

module.exports = class AuthController {
  /*
    Retrive all tasks from list by id page by page
  */
  static index(req, res) {
    return res
      .status(200)
      .send({
        now: new Date().toISOString(),
        version: '1.0.0',
        aws_update: false,
      });
  }

  static async logout(req, res) {
    try {
      const token = req.headers.authorization.split('Bearer ').join('');

      const logout = await AuthService.logout(token);
      return res.status(logout.code).send(logout.message);
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  }

  static async verify(req, res) {
    const { token } = req.query;
    const verify = await AuthService.isTokenValid(token);

    return res.send(verify);
  }

  static async store(req, res) {
    try {
      const { username, password, email, name } = req.body;
      const user = await AuthService.createUser(
        username,
        password,
        email,
        name
      );
      return res.status(user.status).send(user.data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserService.findUser(username, password);

      if (user.status === 200) {
        const token = await AuthService.generateToken(
          username,
          user.data.email,
          user.data.id
        );
        return res.status(200).send({ user: user.data, token });
      }
      throw new Error(user.data.message);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};
