import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from './webpack.config.dev.babel';
import open from 'open';

/* eslint-disable no-console */
const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Content has been served at http://localhost:${port}`)
    open(`http://localhost:${port}`);
  }
});
