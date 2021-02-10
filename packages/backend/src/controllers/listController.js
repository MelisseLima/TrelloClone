const connection = require("../database/connection");
const listSchema = require("../models/list");
const generatedID = require("../utils/generatedID");

module.exports = {
  /*
    Retrive all lists page by page
  */

  async index(request, response) {
    try {
      const lists = await connection("list").select(["list.*"]);

      return response.json(lists);
    } catch (error) {}
  },

  async editList(request, response) {
    try {
      const { id, label } = request.body;

      const list = await connection("list")
        .where("id", id)
        .select("*")
        .first()
        .update("label", label);

      return response.json({ list });
    } catch (e) {}
  },

  async removeList(request, response) {
    try {
      const { id } = request.body;

      const lists = await connection("list")
        .where("id", id)
        .select("*")
        .first()
        .del();

      return response.status(200).send();
    } catch (e) {}
  },

  async store(request, response) {
    try {
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
      return response.status(422).json({
        message: "Invalid Request",
        data: {
          id,
          label,
          index,
        },
      });
    } catch (e) {}
  },
};
