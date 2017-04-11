'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    // Perform actions
    const body = req.body;

    app.service('users').create({
      email: body.email,
      password: body.password
    }).then(user => { 
      res.status(401).json(user);
    }).catch(next);
  };
};
