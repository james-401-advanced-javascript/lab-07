'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');

const mockServer = supertester(server);
// this is actually server.js > server
// (akin to server.start, we're doing server.server)

describe('web server', () => {
  it('should respond properly on request to /people', () => {
    mockServer
      .get('/people')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(4);
      })
      .catch(console.error);
  });

  test('async/await: should respond properly on request to /people', async () => {
    try {
      let res = await mockServer.get('/people');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(4);
    } catch (e) {
      console.error(e);
    }
  });
  it('should respond properly on post to /teams', () => {
    mockServer
      .post('/people')
      .send({ firstName: 'Test', lastName: 'Team' })
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.firstName).toBe('Test');
      })
      .catch(console.error);
  });

  // Team testing
  it('should respond properly on request to /teams', async () => {
    try {
      let results = await mockServer.get('/teams');
      expect(results.status).toBe(200);
      expect(results.body.count).toBe(3);
    } catch (e) {
      console.error(e);
    }
  });

  test('async/await: should respond properly on request to /teams', async () => {
    try {
      let res = await mockServer.get('/teams');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(3);
    } catch (e) {
      console.error(e);
    }
  });

  it('should respond properly on post to /people', () => {
    mockServer
      .post('/teams')
      .send({ name: 'Black Panther', color: 'Black' })
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Black Panther');
      })
      .catch(console.error);
  });
});
