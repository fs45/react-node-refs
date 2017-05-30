const { db } = require('../connection.js');

const getServices = (req, res) => {
  db.select().from('sp_to_check_service').orderBy('OrderIndexId')
  .then(results => {
    res.json({service: results});
  })
  .catch(err => {
    console.log(err);      
    res.send(500);
  });
}

module.exports = { getServices };

