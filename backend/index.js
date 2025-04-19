const express = require('express');
const databaseMiddleware = require('./middlewares/database.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const app = express();
const port = 8000;

app.use(databaseMiddleware);
app.use('/', require('./routes'));
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`backend server listening on port ${port}`);
});
