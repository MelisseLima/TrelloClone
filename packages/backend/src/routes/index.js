/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

const rotas = [];

fs.readdirSync(__dirname)
  .filter(
    (file) => file.indexOf('.') !== 0
      && file !== path.basename(__filename)
      && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    rotas.push(require(path.join(__dirname, file)));
  });

module.exports = (app) => rotas.map((router) => app.use(router));
