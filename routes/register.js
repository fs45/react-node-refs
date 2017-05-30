const { db } = require('../connection.js');

const register = (req, res) => {
  console.log(req.body);
  res.send(200);
};

module.exports = { register };