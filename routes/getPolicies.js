const { db } = require('../connection.js');
const { tableToFieldName } = require('../utils/index.js'); 

const getPolicies = (req, res) => {
  let { selector, id, policyTypeId } = req.query;
  // id must be in string format (with quotations): "AROAIQYAO4LYJE4CGJXG6"
  const policyTypeIds = [4, 5];

  let queryString = (selectorType, id, policyTypeId) => {
    const selectorTypeFieldName = tableToFieldName(selectorType); // role => Role
    // for role and group:
    id = '"'+ id + '"';
    if ((selectorType === 'role') || (selectorType === 'group')) {

      return `select distinct  t3.PolicyId, t1.PolicyName from iam_policy_attachment t1
                INNER JOIN iam_${selectorType} t2 ON t1.EntityId = t2.${selectorTypeFieldName}Id 
                INNER JOIN \`iam_policy\` t3 ON t1.PolicyName  = t3.PolicyName 
                WHERE t3.PolicyTypeId = 4 and t2.${selectorTypeFieldName}Id = ${id}
                order by t3.OrderByIndex asc`;
    } else {
      // for user selection:
      return `select distinct  t3.PolicyId, t1.PolicyName from iam_policy_attachment t1
              INNER JOIN iam_user t2 ON t1.EntityId = t2.UserId 
              INNER JOIN \`iam_policy\` t3 ON t1.PolicyName  = t3.PolicyName 
              WHERE t3.PolicyTypeId = 4 and t2.UserId = ${id}
              order by t3.OrderByIndex asc`;
    }
  }

  if (policyTypeId === 'all') {
    let queries = policyTypeIds.map((p) => db.raw(queryString(selector, id, p)));
    Promise.all(queries)
    .then(results => {
      res.json({ policy: 
        results
          .map(result => result[0])
          .reduce((acc, element)=>{
            if (element != null ) {
              acc.push(element);
            }
            return acc;
          },[])
      });
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    db.raw(queryString(selector, id, policyTypeId))
    .then(results => {
      // res.send(200);
      res.json({policy: results[0]});
    })
    .catch(err => {
      console.log(err);      
      res.send(500);
    });
  }
}

module.exports = { getPolicies };

