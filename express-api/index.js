const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 2000;
const bearerToken = require('express-bearer-token');
const { userRouter } = require('./router');

const app = express();
app.use(cors());
app.use(bodyParser());
app.use(bearerToken());

const server = require('http').createServer(app);

app.get('/', (req, res) => {
  res.status(200).send('<h1>API running on</h1>');
});
app.use('/userdb', userRouter);

server.listen(port, () => console.log(`API running at http://localhost:${port}`));
