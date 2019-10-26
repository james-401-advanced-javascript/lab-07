'use strict';
const express = require('express');
const router = express.Router(); // router
let db = require('../db');
const message = require('./message');

// Route to Get all teams
router.get('/', message('All teams retrieved.'), (req, res, next) => {
  let count = db.teams.length;
  let results = db.teams;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get a team
router.get('/:id', message('Individual team retrieved.'), (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a person
router.post('/', message('Team created.'), (req, res, next) => {
  let record = req.body;
  // what can you do to ensure there are no
  // duplicate ids?
  // for the sake of this exercise, take the last team's id in the array and add 1 to it for the next id
  // this will result in gaps when a team is deleted
  let newID = ++db.teams[db.teams.length - 1].id;
  record.id = newID;
  db.teams.push(record);
  res.json(record);
});

// Route to Update a person
router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  let changes = req.body;
  record[0] = { ...changes };
  db.teams[id] = record[0];
  res.json(record[0]);
});

// Route to Delete a person
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  delete db.teams[id];
  res.json(db.teams);
});

module.exports = router;
