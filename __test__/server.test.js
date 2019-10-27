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

  it('should respond properly to a put request on /people route', async () => {
    try {
      let data = await mockServer
        .put('/people/4')
        .send({ firstName: 'Darren' });

      expect(data.status).toBe(200);
      expect(data.body.firstName).toBe('Darren');
    } catch (e) {
      console.error(e);
    }
  });
  it('should respond properly to a delete request on /people route', async () => {
    try {
      let data = await mockServer.delete('/people/4');

      expect(data.status).toBe(200);
    } catch (e) {
      console.error(e);
    }
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

  it('should respond properly on post to /teams', async () => {
    try {
      let results = await mockServer
        .post('/teams')
        .send({ name: 'Black Panther', color: 'Black' });

      expect(results.status).toBe(200);
    } catch (e) {
      console.error(e);
    }
  });
  it('should respond properly to a put request on /teams route', async () => {
    try {
      let data = await mockServer.put('/teams/4').send({ color: 'red' });
      console.log('DA DATA: ', data.valid);
      expect(data.status).toBe(200);
    } catch (e) {
      console.error(e);
    }
  });
  it('should respond properly to a delete request on /teams route', async () => {
    try {
      let data = await mockServer.delete('/teams/3');

      expect(data.status).toBe(200);
    } catch (e) {
      console.error(e);
    }
  });
  it('should log a 400 error if unknown route', async () => {
    try {
      let data = await mockServer.get('/fakeroute');

      expect(data.status).toBe(404);
    } catch (e) {
      console.error(e);
    }
  });
  it('should log a 500 error if someone goes to /error route', async () => {
    try {
      let data = await mockServer.get('/500error');

      expect(data.status).toBe(500);
    } catch (e) {
      console.error(e);
    }
  });
});
