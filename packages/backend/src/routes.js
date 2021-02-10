const { Router } = require("express");
const taskController = require("./controllers/taskController");
const listController = require("./controllers/listController");

const routes = Router();

// Search Count By City
routes.get("/", listController.index);
routes.post("/list", listController.store);
routes.post("/editList", listController.editList);
routes.post("/lists", listController.removeList);

routes.get("/task", taskController.index);
routes.post("/task", taskController.store);
routes.post("/editTask", taskController.editTask);
routes.post("/tasks", taskController.removeTask);

module.exports = routes;
