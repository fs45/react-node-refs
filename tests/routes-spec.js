var expect = require('chai').expect;
var request = require('supertest');
var getAllItems = require('../routes/getAllItems.js')
var getGroups = require('../routes/getGroups.js')
var getPolicies = require('../routes/getPolicies.js')
var getRoles = require('../routes/getRoles.js')
var getServices = require('../routes/getServices.js')

var app = require('../server.js').app;

describe('API Endpoints Test', function() {
  it('/all should get all user, role, group, policy data', function(done) {
    request(app)
      .get('/api/all')
      .expect(200)
      .end(function(err, res) {
        if(err) { return done(err); }
        expect(res.body.group.length).to.not.equal(0);
        expect(res.body.role.length).to.not.equal(0);
        expect(res.body.user.length).to.not.equal(0);
        expect(res.body.managedPolicy.length).to.not.equal(0);
        expect(res.body.customPolicy.length).to.not.equal(0);
        done();
      });
  });
  
  it('/policyDetails should get correct data for a policy', function(done) {
     request(app)
      .get('/api/policyDetails')
      .query({id: "ANPAILL3HVNFSB6DCOWYQ"})
      .then(function(res) {
        // console.log(res.body);
        expect(res.body.Document).to.not.equal(undefined);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
  
  it('/policy should get correct policies data for a role/group', function(done) {
     // load policies for role #AROAJOWQ2E4DUXJHH55G6, with all policy types
     request(app)
      .get('/api/policy')
      .query({selector: 'role', id:'AROAJOWQ2E4DUXJHH55G6', policyTypeId:'all'})
      .then(function(res) {
        expect(res.body.policy[0].length).to.not.equal(0); // managed policy
        expect(res.body.policy[1].length).to.not.equal(0); // custom policy
        expect(res.body.policy[0].map(p => p.ResourceName).includes('AmazonEC2FullAccess')).to.be.true;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('/actions should get correct actions data for a service', function(done) {
     // load policies for role #AROAJOWQ2E4DUXJHH55G6, with all policy types
     request(app)
      .get('/api/action')
      .query({selector: 'service', id:'255'})
      .then(function(res) {
        console.log(res.body.commonAction);
        expect(res.body.action.length).to.not.equal(0);
        expect(res.body.action.length).to.equal(223); // based on the current data  
        expect(res.body.commonAction.length).to.equal(0);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

});
