'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    // Perform actions
    const body = req.body;

    app.service('users').create({
      email: body.email,
      password: body.password
    }).then(user => {
      let data = {
        success: true,
        message: 'User has been registered to the database'
      };
      res.json(data);
    }).catch(next);
  };
};
