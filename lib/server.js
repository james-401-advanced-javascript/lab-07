'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people-routes');
const teamRoutes = require('./routes/team-routes');

// Imported Middleware
const timestamp = require('./routes/timestamp');
const error404 = require('./routes/404');

/**
 * App homepage
 * @route GET /
 * @security basicAuth
 * @returns {string} 200 - Successful connection
 * @returns {error} 404 - Page not found error
 * @returns {error} 500 - Server error
 *
 */
app.get('/', (req, res, next) => {
  res.send('Homepage for Lab-07!');
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(timestamp);
app.use('/people', peopleRoutes);
app.use('/teams', teamRoutes);
app.get('/500error', (req, res, next) => {
  res.status(500);
  res.send('500: Server Error');
  res.end();
});

/**
 * Respond with 404 error if unknown route is requested
 */
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
