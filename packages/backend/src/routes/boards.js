const { Router } = require('express');
const BoardController = require('../controllers/BoardController');

const routes = Router();

routes.get('/boards', BoardController.index);
routes.get('/board/:id', BoardController.getBoardById);
routes.post('/board', BoardController.store);
routes.put('/board/:id', BoardController.update);
routes.delete('/board/:id', BoardController.delete);

module.exports = routes;
