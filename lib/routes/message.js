'use strict';

/**
 * Middleware that accepts a parameter called message.
 * The middleware should console.log() the path, method, and requestTime properties for every request, as well as whatever message is passed to the middleware
 * Alter the get and posts routes to call your logging middleware with a custom message
 * @param req
 * @param res
 * @param next
 * @param message
 */
module.exports = (req, res, next, message) => {
  console.log('Path: ', req.route.path);
  console.log('Method: ', req.method);
  console.log('Request Time: ', req.requestTime);
  console.log('Message: ', message);
  next();
};

// Create logging middleware that accepts a parameter called message. The middleware should console.log() the path, method, and requestTime properties for every request, as well as whatever message is passed to the middleware

//     Alter the get and posts routes to call your logging middleware with a custom message
