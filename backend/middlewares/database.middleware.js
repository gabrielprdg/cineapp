const {pool} = require('../database');

function databaseMiddleware(req, res, next) {
  req.database = {pool};
  pool.connect((err, client, done) => {
    if (err) {
      next(err);
      return;
    }

    req.database.client = client;
    next();
    done();
  });
}

module.exports = databaseMiddleware;
