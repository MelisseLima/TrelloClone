const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const routes = Router();

routes.get("/", AuthController.index);
routes.post("/login", AuthController.login);
routes.put("/logout", AuthController.logout);
routes.post("/register", AuthController.store);

module.exports = routes;
