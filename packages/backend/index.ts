const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(express.json());

require('./src/routes')(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});