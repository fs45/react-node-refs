const { db } = require('../connection.js');
const sequence = ['service', 'user', 'group', 'role', 'managedPolicy', 'customPolicy'];
const policyQuery = (type) => {
  const policyTypeId = (type === 'custom') ? 5 : 4; 
  return `select distinct t1.IamResourceId, t1.ResourceName, t4.PolicyTypeId, t4.PolicyTypeName, t3.PolicyId from sp_from_check_iam_resource  t1 INNER JOIN iam_attached_group_policy t2 ON t1.ResourceName = t2.PolicyName
    INNER JOIN \`iam_policy\` t3 ON t2.PolicyName  = t3.PolicyName INNER JOIN iam_policy_type t4 WHERE t3.PolicyTypeId = t4.PolicyTypeId  
      and t4.PolicyTypeId = ${policyTypeId}`;
};

const getAllItems = (req, res) => {
  Promise.all([
    db('iam_service').select().orderBy('OrderByIndex'),
    db('iam_user').select('UserId', 'UserName').orderBy('OrderByIndex'),
    db('iam_group').select('GroupId', 'GroupName').orderBy('OrderByIndex'),
    db('iam_role').select('RoleId', 'RoleName').orderBy('OrderByIndex'),
    db.raw(policyQuery('managed')),
    db.raw(policyQuery('custom'))
    ])
    .then(results => {
      return res.json(
        results
          .reduce((res, item, i) => {
            if( i === (sequence.length - 1) || i === (sequence.length - 2) ) { 
              // handle the raw query promise format for managed and custom policy data
              res[sequence[i]] = item[0];
            } else {
              res[sequence[i]] = item;
            }
            return res;
          },{})
      );
    })
    .catch(err => {
      console.log(err);      
      res.send(500);
    });
}

module.exports = { getAllItems };

