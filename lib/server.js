'use strict';

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const People = require('./routes/people-routes');
const Team = require('./routes/team-routes');
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

let person = new People();
let team = new Team();

app.get('/people', (req, res, next) => {
  person.getAll(req, res, next);
});

// Route to Get a person
app.get('/people/:id', (req, res, next) => {
  person.getPerson(req, res, next);
});

// Route to Create a person
app.post('/people', (req, res, next) => {
  person.createPerson(req, res, next);
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
});

// Route to Get a team
app.get('/teams/:id', (req, res, next) => {
  team.getTeam(req, res, next);
});

// Route to Create a team
app.post('/teams', (req, res, next) => {
  team.createTeam(req, res, next);
});

// Route to Update a team
app.put('/teams/:id', (req, res, next) => {
  team.updateTeam(req, res, next);
});

// Route to Delete a team
app.delete('/teams/:id', (req, res, next) => {
  team.deleteTeam(req, res, next);
});

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
