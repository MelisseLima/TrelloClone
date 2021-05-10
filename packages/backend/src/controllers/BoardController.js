const BoardService = require("../services/BoardService");
const AuthService = require("../services/AuthService");
const ListsService = require("../services/ListsService");

module.exports = class BoardController {
  /*
    Retrive all tasks from list by id page by page
  */
  static async index(req, res) {
    try {
      const auth = req.headers.authorization;
      const data = await AuthService.getTokenData(auth);
      const boards = await BoardService.index(data.id);
      return res.status(200).send({ data: boards, success: true });
    } catch (error) {
      console.log("error : ", error.message);
    }
  }

  static async getBoardById(req, res) {
    try {
      const { id } = req.params;
      const board = await BoardService.getBoardById(id);
      return res.status(200).send({ data: board, success: true });
    } catch (error) {
      return res.status(500).send({ data: {}, success: false });
    }
  }

  static async createList(req, res) {
    try {
      const auth = req.headers.authorization;
      const { name, board_id } = req.body;
      const list = await ListsService.store(name, board_id);
      return res
        .status(200)
        .send({ data: list, message: "Coluna criada com sucesso" });
    } catch (error) {
      return res.status(500).send({
        data: [],
        message:
          "Não foi possivel criar coluna agora tente novamente mais tarde.",
      });
    }
  }

  static async store(req, res) {
    try {
      const auth = req.headers.authorization;
      const { name, description } = req.body;
      const data = await AuthService.getTokenData(auth);
      const board = await BoardService.store(name, description, data.id);
      return res.status(200).send({ data: board });
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  }

  static async update(req, res) {
    const { token } = req.query;
    const verify = await AuthService.isTokenValid(token);

    return res.send(verify);
  }

  static async delete(req, res) {
    try {
      return res.status("user.status").send("user.data");
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
