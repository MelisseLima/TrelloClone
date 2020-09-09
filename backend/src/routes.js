const { Router } = require("express");
const taskController = require("./controllers/taskController");
const listController = require("./controllers/listController");

const routes = Router();

// Search Count By City
routes.get("/", listController.index);
routes.post("/list", listController.store);
routes.delete("/list", listController.delete);

routes.get("/todo", taskController.index);
routes.post("/todo", taskController.store);
routes.delete("/todo", taskController.delete);

module.exports = routes;
