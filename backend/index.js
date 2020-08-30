require('dotenv/config');

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const { PORT } = process.env;
const { HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, HOST);

module.exports = app;
