const bcrypt = require('bcrypt');

const password = 'hn1234';

bcrypt.hash(password, 10).then(hash => {
  console.log("HASH GENERADO:");
  console.log(hash);
});