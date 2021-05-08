const { Router } = require('express');
const TaskController = require('../controllers/TaskController');

const routes = Router();

routes.get('/task', TaskController.index);
routes.post('/task', TaskController.store);
routes.post('/editTask', TaskController.editTask);
routes.post('/tasks', TaskController.removeTask);

module.exports = routes;
