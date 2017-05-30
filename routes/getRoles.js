const { db } = require('../connection.js');
const { tableToFieldName } = require('../utils/index.js'); 

const getRoles = (req, res) => {
  const { selector, id } = req.query;
  if (selector === 'itself') {
    db('iam_role').where({RoleId: id}).select().then(results => res.json(results));
  } else {
    console.log(selector)
    const selectorName = tableToFieldName(selector);
  
    const queryString = `
      SELECT * 
      FROM \`iam_role\` 
      JOIN \`${selector}_role\` ON \`${selector}_role\`.\`RoleId\` = \`iam_role\`.\`RoleId\` 
      WHERE \`${selector}_role\`.\`${selectorName}Id\` = ${id};
    `;

    db.raw(queryString)
    // db.select().from('role') 
    // db('role_policy')
    .then(results => {
      res.json({role: results[0]});
    })
    .catch(err => {
      console.log(err);      
      res.send(500);
    });
  }
  // TODO: don't you need to specify which id in the query? Or should I just filter it?
}

module.exports = { getRoles };
