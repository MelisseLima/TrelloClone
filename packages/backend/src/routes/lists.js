const { Router } = require('express');
const BoardController = require('../controllers/BoardController');

const routes = Router();

routes.post('/list', BoardController.createList);

module.exports = routes;
