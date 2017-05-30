const Promise = require('bluebird');
const { loadPolicyDocuments, loadDiagrams } = require('./index.js')
const fs = require('fs');
const readdirP = Promise.promisify(fs.readdir);
const assetPath = './dbAssets/policy-files/';
const diagramPath = './dist/assets/diagrams/'

readdirP(assetPath)
  .then((files) => files.map(file => loadPolicyDocuments(file, assetPath)))
  .catch(console.log);

readdirP(diagramPath)
  .then(diagramNames => {diagramNames.map(diagramName => loadDiagrams(diagramName.split('.png')[0]))})
  .catch(console.log)