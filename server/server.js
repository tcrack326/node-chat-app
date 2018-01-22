const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
console.log("env*****", env);

const app = express();
app.set('view engine', 'html');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('index');
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
