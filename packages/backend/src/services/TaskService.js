const db = require('../db');

module.exports = class TaskService {
  static async index(id) {
    try {
      const lists = await db.sequelize.query(
        'SELECT * FROM tasks where board_id=$1',
        {
          bind: [id],
        }
      );

      return [...lists[0]];
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  static async store(title, description, board_id) {
    try {
      const list = await db.sequelize.query(
        'SELECT id FROM lists where board_id=$1 and index = 0',
        { bind: [board_id] }
      );

      const count = await db.sequelize.query(
        'SELECT count(*) FROM tasks where list_id=$1',
        { bind: [board_id] }
      );

      console.log(list[0].id, count[0]);

      const task = await db.sequelize.query(
        `
        INSERT INTO public.tasks
        (description, "index", list_id, board_id, title)
        VALUES(
            $2, 
            NULL, 
            '1ee94d34-b6d5-4b8b-99f2-7a29cac9c66c'::uuid, 
            '4a1e7f3a-f42f-48ad-b285-8af7d2287d5b'::uuid, 
            $1
        );
        returning *`,
        { bind: [title, description, board_id, count[0][0].count] }
      );

      return task[0];
    } catch (error) {
      console.log(error);
    }
  }
};
