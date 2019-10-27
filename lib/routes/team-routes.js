'use strict';
const express = require('express');
const router = express.Router(); // app
let db = require('../db');
const message = require('./message');

// Route to Get all teams
/**
 * Listen for get requests to the /teams route
 * @route GET /teams
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 */
router.get('/', message('All teams retrieved.'), (req, res, next) => {
  let count = db.teams.length;
  let results = db.teams;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get a team
/**
 * Listen for get requests to and individual id on the the /teams route
 * @route GET /teams/:id
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 */
router.get('/:id', message('Individual team retrieved.'), (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a team
/**
 * Listen for post requests to the /teams route
 * @route POST /teams/:id
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 */
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

// Route to Update a team
/**
 * Listen for put requests to the /teams route
 * @route PUT /teams/:id
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 */
router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  let changes = req.body;
  record[0] = { ...changes };
  db.teams[id] = record[0];
  res.json(record[0]);
});

// Route to Delete a team
/**
 * Listen for delete requests to the /teams route
 * @route DELETE /teams/:id
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 */
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  delete db.teams[id];
  res.json(db.teams);
});

module.exports = router;
