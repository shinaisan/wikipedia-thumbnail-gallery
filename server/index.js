'use strict';

const app = require('./app');

const PORT = (process.env.PORT || 7070);

if (!!process.env.INJECT_REQUEST_ERROR) {
  var wp = require('./wikipedia');
  console.log('Injecting request error...');
  wp.injectRequestError(process.env.INJECT_REQUEST_ERROR);
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

