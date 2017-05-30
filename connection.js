
const config = require('config');

const dbHost = config.get('dbHost');
const user = config.get('dbUser');
const password = config.get('dbPassword');
const database = config.get('dbName');

const db = require('knex')({
  client: 'mysql',
  connection: {
    host : dbHost,
    user,
    database,
    password
  },
  pool: { 
    min: 0,
    max: 10,
  }
});

// check the connection:
db.raw('SELECT 1+1 as result;').then(res =>{
  console.log('connection successful');
}).catch(err => {
  console.log('connection failed');
  console.log(err);
})

module.exports = { db };
