/* eslint-disable camelcase */
const connection = require("../database/connection");
const taskSchema = require("../models/task");

module.exports = {
  /*
    Retrive all tasks from list by id page by page
  */

  async index(request, response) {
    const { page = 1, list_id } = request.query;

    const [count] = await connection("task")
      .where("list_id", "=", list_id)
      .count();

    const tasks = await connection("task")
      .where("list_id", "=", list_id)
      .limit(5)
      .offset((page - 1) * 5)
      .select();

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(tasks);
  },

  /* Store data at the database on MongoDb */
  async store(request, response) {
    const { id, title, description, list_id, index } = request.body;

    const result = taskSchema.validate({
      id,
      description,
      list_id,
      index,
    });
    const { error } = result;
    const valid = error == null;
    if (valid) {
      const createPost = await connection("task").insert({
        id,
        description,
        list_id,
        index,
      });
      return response.json({ message: "task Created", data: createPost });
    }
    /*
      If havent returned return status 422
    */
    return response.status(422).json({
      message: "Invalid Request",
      data: {
        id,
        description,
        list_id,
        index,
      },
    });
  },
  async delete(request, response) {
    const { id } = request.body;

    const task = await connection("task").where("id", id).first();

    if (!task) {
      return response.status(404).json({
        error: "Was not found that list.",
      });
    }
    await connection("task").where("id", id).delete();
    return response.status(204).send();
  },
};
