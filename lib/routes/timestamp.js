'use strict';

/**
 * Super simple middleware that adds a timestamp to each incoming request.
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};
