const { db } = require('../connection.js');

// TODO: handle common actions for CommonlyUsed = 1
const getActions = (req, res) => {
  const { id } = req.query;

  Promise.all([
    db('iam_service')
    .innerJoin('iam_policy_action', 'iam_policy_action.ServiceIAMName', '=', 'iam_service.ServiceActionIamName' )
    .where('iam_service.ServiceId', id)
    .select(),
    db('iam_service')
    .innerJoin('iam_policy_action', 'iam_policy_action.ServiceIAMName', '=', 'iam_service.ServiceActionIamName' )
    .where('iam_service.ServiceId', id)
    .andWhere('iam_policy_action.CommonlyUsed', 1)
    .select(),
  ])
  .then(results => res.json({action: results[0], commonAction: results[1]}))
  .catch(err => {
    console.log(err); 
    res.send(500);
  });
}

module.exports = { getActions };