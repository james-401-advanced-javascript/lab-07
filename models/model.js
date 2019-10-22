'use strict';

const validate = require('jsonschema').validate;
const fetch = require('node-fetch');

class Model {
  constructor(schema, url) {
    this.schema = schema;
    this.url = `http://localhost:3000/${url}`;
  }

  async get(id) {
    // HTTP method to GET
    // "this.url/" + id
    let path = this.url + `/${id}`;

    let res = await fetch(path, { method: 'GET' });

    if (res.ok) {
      let json = await res.json();
      return json;
    } else {
      console.log(res.statusText);
      return false;
    }
  }

  async getFromField(query) {
    let path = this.url;
    if (query) {
      path += `/?${query}`;
    }

    let res = await fetch(path, { method: 'GET' });

    if (res.ok) {
      let json = await res.json();
      return json;
    } else {
      console.log(res.statusText);
      return false;
    }
  }

  async create(record) {
    // validate input
    let valid = validate(record, this.schema);
    console.log(valid);
    if (!valid) {
      console.log('Invalid input');
    } else {
      let res = fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(record),
        headers: { 'Content-Type': 'application/json' },
      });

      // if url is good
      // return
      // res = {ok: true, statusText: '', json => async() {}
      // something > returns an object {}
      // }}

      if (res.ok) {
        let json = await res.json();
        console.log('Data: ', json);
      } else {
        console.log('Response Text: ', res.statusText);
      }
    }
  }

  update(id, record) {}

  delete(id) {}

  async count(query) {
    let path = this.url;
    if (query) {
      path += `/${query}`;
    }

    let res = await fetch(path, { method: 'GET' });

    if (res.ok) {
      let json = await res.json();
      console.log(`${this.constructor.name}: `, json.length);
      return json.length;
    } else {
      console.log(res.statusText);
    }
  }

  sanitize(record) {
    if (record === undefined) return undefined;
    let valid = validate(record, this.schema);
    console.log('Valid obj: ', valid);
    if (valid) return true;
    else return false;
  }
}

module.exports = Model;
