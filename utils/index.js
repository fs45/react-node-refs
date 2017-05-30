const fs = require('fs');
const { db } = require('../connection.js');
const Promise = require('bluebird');
const readFileP = Promise.promisify(fs.readFile);

// use for converting the table name to field name. 
const tableToFieldName = (tableName) => {
  let singular;
  if (tableName.lastIndexOf('s') === tableName.length) {
    singular = tableName.split('s')[0];
  } else {
    singular = tableName;
  }
  let charArr = singular.split('');
  if (singular.charAt(charArr.length - 2) === 'i' && 
    singular.charAt(charArr.length - 2) === 'e') {
    charArr.slice(0, singular.lastIndexOf('i')).push('y');
  }
  return charArr[0].toUpperCase().concat(charArr.slice(1).join(''));
}

const loadPolicyDocuments = (fileName, path) => {
  const filePath = path + fileName;
  readFileP(filePath, 'utf8').then((data) => {
    data = JSON.parse(data);
    return db('policy').where({PolicyName: fileName.split('.json')[0]}).update({
      PolicyDocument: JSON.stringify(data)
    }).then(console.log).catch(console.log);
  });
}

const loadDiagrams = (diagramFileName) => {
  db('role')
  .where({RoleName: diagramFileName })
  .update({DiagramPath: diagramFileName + '.png'})
  .then(console.log)
  .catch(console.log);

  db('policy')
  .where({PolicyName: diagramFileName })
  .update({DiagramPath: diagramFileName + '.png'})
  .then(console.log)
  .catch(console.log);
}

module.exports = {
  tableToFieldName,
  loadPolicyDocuments,
  loadDiagrams
};