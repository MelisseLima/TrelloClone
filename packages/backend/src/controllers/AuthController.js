/* eslint-disable camelcase */
const connection = require('../database/connection');
const generatedID = require('../utils/generatedID');

module.exports = class AuthController {
  /*
    Retrive all tasks from list by id page by page
  */
  static index(req, res) {
    return res
      .status(200)
      .send({ now: new Date().toISOString(), version: '1.0.0' });
  }

  static login(req, res) {
    try {
      const { username, password } = req.body;
    } catch (error) {

    }
  }
};
