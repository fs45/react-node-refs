const { db } = require('../connection.js');
  
const login = (req, res) => {
  console.log(req.body);
  res.send(200);
};

module.exports = { login };