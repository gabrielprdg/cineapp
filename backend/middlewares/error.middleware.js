function errorMiddleware(err, req, res, next) {
  console.error(err.stack);
  if (err.status)
    res.status(err.status);
  res.json(err);
}

module.exports = errorMiddleware;
