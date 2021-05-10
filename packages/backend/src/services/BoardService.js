const db = require("../db");
const ListsService = require("./ListsService");

module.exports = class BoardService {
  static async index(userId) {
    try {
      const boards = await db.sequelize.query(
        "SELECT * FROM boards where owner=$1",
        {
          bind: [userId],
        }
      );

      return [...boards[0]];
    } catch (error) {
      console.log("error: ", error.message);
    }
  }

  static async getBoardById(id) {
    try {
      const boards = await db.sequelize.query(
        "SELECT * FROM boards where id=$1",
        {
          bind: [id],
        }
      );
      const lists = await ListsService.getListsByBoardId(id);
      return { ...boards[0][0], lists };
    } catch (error) {
      console.log("error: ", error.message);
    }
  }

  static async store(name, description, userId) {
    try {
      const board = await db.sequelize.query(
        `
        insert
            into
            public.boards (
            "name",
            "owner",
            "description")
        values(
        $1,
        $2,
        $3) returning *`,
        { bind: [name, userId, description] }
      );
      return board[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async update() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(token) {
    try {
    } catch (error) {
      return { message: error.message, code: 401 };
    }
  }
};
