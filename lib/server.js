'use strict';

const express = require('express');
const app = express();

let db = require('./db.js');

app.use(express.json());

// Default Route
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// Route to Get all People
app.get('/people', (req, res, next) => {
  let count = db.people.length;
  let results = db.people;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get a person
app.get('/people/:id', (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.people.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a person
app.post('/people', (req, res, next) => {
  let record = req.body;
  // what can you do to ensure there are no
  // duplicate ids?
  record.id = Math.random();
  db.people.push(record);
  res.json(record);
});

// Route to Update a person
app.put('/people/:id', (req, res, next) => {});

// Route to Delete a person
app.delete('/people/:id', (req, res, next) => {});

const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

module.exports = {
  server: app,
  start: start
};
