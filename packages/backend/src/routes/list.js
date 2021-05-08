const { Router } = require("express");
const ListController = require("../controllers/ListController");

const routes = Router();

routes.get("/lists", ListController.index);
routes.post("/list", ListController.store);
routes.post("/editList", ListController.editList);
routes.post("/lists", ListController.removeList);

module.exports = routes;
