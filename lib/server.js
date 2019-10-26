'use strict';

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people-routes');
const teamRoutes = require('./routes/team-routes');

// Imported Middleware
const timestamp = require('./routes/timestamp');
const error404 = require('./routes/404');
// const error500 = require('./routes/500');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(timestamp);
app.use('/people', peopleRoutes);
app.use('/teams', teamRoutes);

app.use('*', error404);

const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

module.exports = {
  server: app,
  start: start,
};
