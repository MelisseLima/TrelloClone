const TaskService = require('../services/ListsService');

module.exports = class TaskController {
  static async index(req, res) {
    try {
      const { board_id } = req.query;
      const tasks = await TaskService.index(board_id);
      return res.status(200).send({ data: tasks });
    } catch (error) {}
  }
  static async store(req, res) {
    try {
      const { title, description, board_id } = req.body;
      const task = await TaskService.store(title, description, board_id);
      return res
        .status(200)
        .send({ data: task, message: 'Tarefa criada com sucesso' });
    } catch (error) {
      return res.status(500).send({
        data: [],
        message:
          'Não foi possivel criar coluna agora tente novamente mais tarde.',
      });
    }
  }
  static async update(req, res) {}
  static async delete(req, res) {}
};
