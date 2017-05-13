import express from 'express';
import path from 'path';
import compression from 'compression';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('lib/client'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../lib/client/index.html'));
});

app.listen(port, function(err) {
  console.log(port);
});
