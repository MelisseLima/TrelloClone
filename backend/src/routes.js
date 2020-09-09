const { Router } = require("express");
const taskController = require("./controllers/taskController");
const listController = require("./controllers/listController");

const routes = Router();

// Search Count By City
routes.get("/", listController.index);
routes.post("/list", listController.store);
routes.delete("/list", listController.delete);

routes.get("/task", taskController.index);
routes.post("/task", taskController.store);
routes.delete("/task", taskController.delete);

module.exports = routes;
