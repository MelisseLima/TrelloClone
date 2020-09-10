const connection = require("../database/connection");
const listSchema = require("../models/list");
const generatedID = require("../utils/generatedID");

module.exports = {
  /*
    Retrive all lists page by page
  */

  async index(request, response) {
    const [count] = await connection("list").count();

    const lists = await connection("list").select(["list.*"]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(lists);
  },

  async store(request, response) {
    const { label } = request.body;
    let id = generatedID(5).toString();
    const [count] = await connection("list").count();
    let index = count.count;

    const result = listSchema.validate({ id, label, index });
    const { error } = result;
    const valid = error == null;
    if (valid) {
      try {
        const createPost = await connection("list").insert({
          id,
          label,
          index,
        });
        return response.json({ message: "List Created", data: createPost });
      } catch (e) {
        throw e.message;
      }
    }
    /*
      If havent returned return status 422
    */
    return response.status(422).json({
      message: "Invalid Request",
      data: {
        id,
        label,
        index,
      },
    });
  },
  async delete(request, response) {
    try {
      const { id } = request.body;

      const list = await connection("list").where("id", id).first();

      if (!list) {
        return response.status(404).json({
          error: "Was not found that list.",
        });
      }
      await connection("list").where("id", id).delete();
      return response.status(204).send();
    } catch (err) {}
  },
};
