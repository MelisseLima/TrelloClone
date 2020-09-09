/* eslint-disable camelcase */
const connection = require("../database/connection");
const taskSchema = require("../models/task");

module.exports = {
  /*
    Retrive all todos from list by id page by page
  */

  async index(request, response) {
    const { page = 1, list_id } = request.query;

    const [count] = await connection("todo")
      .where("list_id", "=", list_id)
      .count();

    const todos = await connection("todo")
      .where("list_id", "=", list_id)
      .limit(5)
      .offset((page - 1) * 5)
      .select();

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(todos);
  },

  /* Store data at the database on MongoDb */
  async store(request, response) {
    const { id, title, description, list_id } = request.body;

    const result = todoSchema.validate({
      id,
      title,
      description,
      list_id,
    });
    const { error } = result;
    const valid = error == null;
    if (valid) {
      const createPost = await connection("todo").insert({
        id,
        title,
        description,
        list_id,
        status: false,
      });
      return response.json({ message: "Todo Created", data: createPost });
    }
    /*
      If havent returned return status 422
    */
    return response.status(422).json({
      message: "Invalid Request",
      data: {
        id,
        title,
        description,
        list_id,
      },
    });
  },
  async delete(request, response) {
    const { id } = request.body;

    const todo = await connection("todo").where("id", id).first();

    if (!todo) {
      return response.status(404).json({
        error: "Was not found that list.",
      });
    }
    await connection("todo").where("id", id).delete();
    return response.status(204).send();
  },
};
