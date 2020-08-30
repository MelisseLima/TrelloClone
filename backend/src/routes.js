const { Router } = require('express');
const todoController = require('./controllers/todoController');
const listController = require('./controllers/listController');

const routes = Router();

// Search Count By City
routes.get('/', listController.index);
routes.post('/list', listController.store);
routes.delete('/list', listController.delete);

routes.get('/todo', todoController.index);
routes.post('/todo', todoController.store);
routes.delete('/todo', todoController.delete);

module.exports = routes;
