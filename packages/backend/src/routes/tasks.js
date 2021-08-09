const { Router } = require('express');
const TaskController = require('../controllers/TaskController');

const routes = Router();

routes.get('/tasks', TaskController.index);
routes.post('/task', TaskController.store);
routes.put('/task', TaskController.update);
routes.delete('/task', TaskController.delete);

module.exports = routes;
