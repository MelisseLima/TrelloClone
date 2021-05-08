const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const routes = Router();

routes.get("/", AuthController.index);

module.exports = routes;
