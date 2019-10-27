'use strict';
const express = require('express');
const router = express.Router(); // app
let db = require('../db');
const message = require('./message');
const error500 = require('./500');

// Route to Get all People
/**
 * Listen for get requests to the /people route
 * @route GET /people
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 * @returns {string} 200 - All people retrieved
 */
router.get('/', message('All people retrieved'), (req, res, next) => {
  let count = db.people.length;
  let results = db.people;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get a person
/**
 * Listen for get requests to individual id on the /people route
 * @route GET /people/:id
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 * @returns {string} 200 - Individual person retrieved
 */
router.get('/:id', message('Individual person retrieved'), (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.people.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a person
/**
 * Listen for post requests to the /people route
 * @route POST /people
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 * @returns {string} 200 - Person created
 * @returns {error} 500 - 500: Server Error
 */
router.post('/', error500(), message('Person created'), (req, res, next) => {
  if (req.valid === false) {
    res.send(req.status);
  } else {
    let record = req.body;
    // what can you do to ensure there are no
    // duplicate ids?
    // for the sake of this exercise, take the last person's id in the array and add 1 to it for the next id
    // this will result in gaps when a person is deleted
    let newID = ++db.people[db.people.length - 1].id;
    record.id = newID;
    db.people.push(record);
    res.json(record);
  }
});

// Route to Update a person
/**
 * Listen for put requests to the /people route
 * @route PUT /people/:id
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 */
router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.people.filter(record => record.id === parseInt(id));
  let changes = req.body;
  record[0] = { ...changes };
  db.people[id] = record[0];
  res.json(record[0]);
});

// Route to Delete a person
/**
 * Listen for delete requests to the /people route
 * @route DELETE /people/:id
 * @security basicAuth
 * @returns {object} 200 - Successul connection
 */
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  delete db.people[id];
  res.json(db.people);
});

module.exports = router;
