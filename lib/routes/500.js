'use strict';

/**
 * This middleware function generates either a 1 or 2
 * If the number is 1, a valid property added to the request object will be marked false
 * If req.valid is false, throw a 500 error
 * If the number is 2, req.valid stays true and the request may continue as expected
 * @param req
 * @param res
 * @param next
 */
module.exports = () => {
  return (req, res, next) => {
    const random = Math.floor(Math.random() * 2 + 1);
    req.valid = true;
    if (random === 1) {
      req.valid = false;
      res.status(500);
      res.send('500: Server Error');
      res.end();
      next();
    }
  };
};
