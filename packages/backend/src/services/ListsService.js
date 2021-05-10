const db = require("../db");

module.exports = class ListsService {
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

  static async getListsByBoardId(id) {
    try {
      const lists = await db.sequelize.query(
        "SELECT * FROM lists where board_id=$1",
        {
          bind: [id],
        }
      );

      return [...lists[0]];
    } catch (error) {
      console.log("error: ", error.message);
    }
  }

  static async store(name, board_id) {
    try {
      const count = await db.sequelize.query(
        "SELECT COUNT(*) FROM lists where board_id=$1",
        { bind: [board_id] }
      );
      const list = await db.sequelize.query(
        `
        INSERT
          into
          public.lists (
          "label",
          board_id,
          "index")
        values($1, $2, $3) returning *`,
        { bind: [name, board_id, count[0][0].count] }
      );
      return list[0];
    } catch (error) {
      console.log(error);
    }
  }
};
