const express = require('express');
const path = require('path');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const port = config.get('port');

const { getRoles } = require('./routes/getRoles.js');
const { getPolicies } = require('./routes/getPolicies.js');
const { getGroups } = require('./routes/getGroups.js');
const { getAllItems } = require('./routes/getAllItems.js');
const { getServices } = require('./routes/getServices.js');
const { getPolicyDetails } = require('./routes/getPolicyDetails.js');
const { getActions } = require('./routes/getActions.js');
const { login } = require('./routes/login.js');
const { register } = require('./routes/register.js');


app.use(express.static('dist'));
  
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
// handle all other requests and route them back to the homepage

router.get('/role', getRoles);
router.get('/policy', getPolicies);
router.get('/group', getGroups);
router.get('/all', getAllItems);
router.get('/service', getServices);
router.get('/policyDetails', getPolicyDetails);
router.get('/action', getActions);

app.use('/api', router);
app.post('/register', register);
app.post('/login', login);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`listening at ${port}`);
})

module.exports = { app }; 
