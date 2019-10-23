'use strict';

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const People = require('./routes/people-routes');
const Team = require('./routes/team-routes');

// Imported Middleware
const timestamp = require('./routes/timestamp');
const message = require('./routes/message');
const error404 = require('./routes/404');
// const error500 = require('./routes/500');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(timestamp);

let person = new People();
let team = new Team();

app.get('/people', (req, res, next) => {
  person.getAll(req, res, next);
  message(req, res, next, 'All people retrieved.');
});

// Route to Get a person
app.get('/people/:id', (req, res, next) => {
  person.getPerson(req, res, next);
  message(req, res, next, 'Individual person retrieved.');
});

// Route to Create a person
app.post('/people', (req, res, next) => {
  person.createPerson(req, res, next);
  message(req, res, next, 'Person created');
});

// Route to Update a person
app.put('/people/:id', (req, res, next) => {
  person.updatePerson(req, res, next);
});

// Route to Delete a person
app.delete('/people/:id', (req, res, next) => {
  person.deletePerson(req, res, next);
});

// TEAM ROUTES
app.get('/teams', (req, res, next) => {
  team.getAll(req, res, next);
  message(req, res, next, 'All teams retrieved.');
});

// Route to Get a team
app.get('/teams/:id', (req, res, next) => {
  team.getTeam(req, res, next);
  message(req, res, next, 'Individual team retrieved.');
});

// Route to Create a team
app.post('/teams', (req, res, next) => {
  team.createTeam(req, res, next);
  message(req, res, next, 'Team created.');
});

// Route to Update a team
app.put('/teams/:id', (req, res, next) => {
  team.updateTeam(req, res, next);
});

// Route to Delete a team
app.delete('/teams/:id', (req, res, next) => {
  team.deleteTeam(req, res, next);
});

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
