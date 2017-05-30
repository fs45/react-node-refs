const { db } = require('../connection.js');
const { tableToFieldName } = require('../utils/index.js'); 

const getGroups = (req, res) => {
  const { selector, id } = req.query;
  if (selector === 'itself') {
    db('iam_group').where({GroupId: id}).select().then(results => res.json(results));
  } else {
    const selectorName = tableToFieldName(selector);
    const queryString = `
      SELECT * 
      FROM \`iam_group\` 
      JOIN \`${selector}_group\` ON \`${selector}_group\`.\`GroupId\` = \`iam_group\`.\`GroupId\` 
      WHERE \`${selector}_group\`.\`${selectorName}Id\` = ${id};
    `;

    db.raw(queryString)
    // db.select().from('group') 
    .then(results => {
      // raw queries have the result in the first element
      res.json({group: results[0]});
    })
    .catch(err => {
      console.log(err);      
      res.send(500);
    });
  }
  // TODO: don't you need to specify which id in the query? Or should I just filter it?
}

module.exports = { getGroups };

