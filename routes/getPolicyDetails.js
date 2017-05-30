const { db } = require('../connection.js');

const getPolicyDetails = (req, res) => {
  const { id } = req.query;
  db('iam_policy').where({ PolicyId: id }).select()
  .then(result => res.json(result[0]))
  .catch(err => {
    console.log(err); 
    res.send(500);
  });
}

module.exports = { getPolicyDetails };