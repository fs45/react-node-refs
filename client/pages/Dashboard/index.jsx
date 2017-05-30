import React from 'react';
import Filterbar from './components/Filterbar.jsx';
import Groups from './components/Groups.jsx';
import PolicyDetail from './components/PolicyDetail.jsx';
import PolicyBreakdown from './components/PolicyBreakdown.jsx';
import Roles from './components/Roles.jsx';
import Policies from './components/Policies.jsx';
import ListPanel from './components/ListPanel.jsx';
import ServiceSecurityDiagram from './components/ServiceSecurityDiagram.jsx';
import { fetchData, tableToFieldName } from '../../utils/index.js';
import Image from 'react-bootstrap/lib/Grid';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import Button from 'react-bootstrap/lib/Button';

const styles = {
  mainContainer: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '50px',
    marginRight:'50px',
    backgroundColor:'#fff'
  },
  loadingContainer: {
    display: 'flex', 
    alignItems:'center',
    justifyContent:'center',
    marginTop:'100px'
  },
  loadingImage: {
    height:'60px', 
    width:'60px', 
    backgroundImage: 'url("./assets/media/loading.gif")', 
    backgroundPosition:'center', 
    backgroundSize:'cover'
  },
  h4: {
    marginTop: '-20px',
    marginBottom: '-10px',
    padding: 0,
  },
  list: {
    fontSize: '12px',
    height: '30px'
  },
  tab: {
    margin: 0
  },
  simulateButton: {
    marginLeft: '10px'
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: [],
      groups: [],
      managedPolicies: [],
      services: [],
      actions: [],
      commonActions:[],
      customPolicies: [],
      associatedManagedPolicies: [],
      associatedCustomPolicies: [],
      selectedPolicy: {},
      selectedActor: {
        role:{},
        user:{},
        group:{}
      },
      loading: true,
      resourceTabKey: 1
    };
    this.handleActions = this.handleActions.bind(this);
    this.handleResourceTabSelection = this.handleResourceTabSelection.bind(this);
  }

  componentDidMount() {
    fetchData({type: 'all'}).then(({ service, user, role, group, managedPolicy, customPolicy }) => {
      this.setState({
        loading: false,
        users: user,
        roles: role,
        groups: group,
        managedPolicies: managedPolicy,
        customPolicies: customPolicy,
        selectedPolicy: managedPolicy[0],
        services: service
      });
      localStorage.setItem('policies', JSON.stringify(this.state));
    });
  }

  handleResourceTabSelection(key) {
    this.setState({resourceTabKey: key});
  }
 
  // handles the children actions
  handleActions({ action, payload }) {
    const actions = {
      filter: (selection) => {
        switch(selection) {
          case 'all':
          fetchData({type: 'all'}).then(({ service, user, role, group, managedPolicy, customPolicy }) => {
            // actors collectively refer to groups and roles.
            this.setState({
              loading: false,
              users: user,
              roles: role,
              groups: group,
              services: service,
              managedPolicies: managedPolicy,
              customPolicies: customPolicy,
              selectedPolicy: managedPolicy[0],
            });
          });
          break;
          default:
          break;
        }
        // select data filters and update state
      },
      search: (term) => {
        var policies = JSON.parse(localStorage.getItem('policies'));

        const tableToFieldName = (stateName) => {
          if(stateName.substring(stateName.length-3) === "ies"){
            // stateName = stateName.substring(0,stateName.length-3)+ 'y';
            stateName = "policy";
          }
          else{
            if(stateName.substring(stateName.length-1) === "s"){
              stateName = stateName.substring(0,stateName.length-1);
            }
          }
          return stateName.charAt(0).toUpperCase() + stateName.slice(1);
        }

        const results = [];

        for (let key in policies) {
          if (policies[key].length) {
             let name = tableToFieldName(key) + 'Name';
            if (policies[key][0][name]) {
              results.push(policies[key].filter(item => item[name].toUpperCase().includes(term.toUpperCase())));
            } 
          }
        }

        // handle multiple results case
        this.setState({roles: results[0]});
        this.setState({groups: results[1]});
        this.setState({managedPolicies: results[2]});
        this.setState({customPolicies: results[3]});
        if(results[0].length > 0){
          this.setState({selectedPolicy: results[0][0]});
        }
        else if(results[1].length > 0){
          this.setState({selectedPolicy: results[1][0]});
        }
        else if(results[2].length > 0){
          this.setState({selectedPolicy: results[2][0]});
        }
        else if(results[3].length > 0){
          this.setState({selectedPolicy: results[3][0]});
        }
      },
      select: ({ type, entity }) => {
        switch(type) {
          case ((type === 'role' || type === 'group' || type === 'user') ? type : -1):
            console.log(type);
            let id = entity[tableToFieldName(type) + 'Id'];
            // clear all other selections in all other actors:
            for (let key in this.state.selectedActor) {
              if(key !== type) {
                this.state.selectedActor[key] = {};
              } else {
                this.state.selectedActor[type] = entity;
              }
            }
            this.setState({ selectedActor: this.state.selectedActor });
            fetchData({type: 'policy', selector:type, id, policyTypeId: 'all'})
             .then(({ policy }) => {
              this.setState({
                associatedManagedPolicies: policy[0],
                associatedCustomPolicies: policy[1],
                selectedPolicy:{},
                resourceTabKey: 4,
              });
            });
            break;
          case 'policy':
            fetchData({type: 'policyDetails', id: entity.PolicyId})
            .then(policy => {
              console.log(policy);
              this.setState({selectedPolicy: policy});
            })
            break;
          case 'service':
            id = entity[tableToFieldName(type) + 'Id'];
            fetchData({type: 'action', selector:type, id })
            .then(({action, commonAction}) => {
              this.setState({
                actions: action,
                commonActions: commonAction
              });
            });
            break;
          default:
            console.log('undefined selection');
            break;
        }
      }
    };
    actions[action](payload);
  }

  render() {
    return (
      <div>
        <Filterbar handleActions={ this.handleActions } />
        {
          this.state.loading ?
          <div style={ styles.loadingContainer }>
            <div style={ styles.loadingImage }>
            </div>
          </div>
          :
          <div style={ styles.mainContainer }>
            <Row md={11}> 
              <Col md={4} style={{marginRight: '15px'}}>
                <h4 style={styles.h4}>Iam Resource Selection </h4>
                <hr></hr>
                <Tabs justified activeKey={this.state.resourceTabKey} onSelect={this.handleResourceTabSelection}> 
                  <Tab eventKey={1} title="Users">
                    <Row style={styles.list}>
                      <ListPanel 
                        items={ this.state.users } 
                        name="User" type="user" 
                        handleActions={this.handleActions} 
                        highlight={this.state.selectedActor.user}/>
                    </Row>
                  </Tab>
                  <Tab eventKey={2} title="Groups/Roles">
                    <Row>
                      <ListPanel 
                        items={ this.state.groups } 
                        name="Group Membership" 
                        type="group" 
                        handleActions={this.handleActions} 
                        highlight={this.state.selectedActor.group}/>
                    </Row>
                    <Row style={styles.list}>
                      <ListPanel 
                        items={ this.state.roles } 
                        name="Role" type="role" 
                        handleActions={this.handleActions} 
                        highlight={this.state.selectedActor.role}/>
                    </Row>
                  </Tab>
                  <Tab eventKey={3} title="Policies">
                    <Row>
                      <ListPanel
                        items={ this.state.managedPolicies }
                        handleActions={this.handleActions}
                        type="policy"
                        name="Managed Policies" />
                    </Row>
                    <Row>
                      <ListPanel 
                        items={ this.state.customPolicies }
                        handleActions={this.handleActions}
                        type="policy"
                        name="Custom Policies"/>
                    </Row>
                    <Row>
                      <PolicyDetail selectedPolicy={this.state.selectedPolicy}/>
                    </Row>
                  </Tab>
                  <Tab eventKey={4} title="A Policies">
                    <Row>
                      <ListPanel 
                        items={ this.state.associatedManagedPolicies }
                        handleActions={this.handleActions}
                        type="policy"
                        name="Managed Policies" />
                    </Row>
                    <Row>
                      <ListPanel 
                        items={ this.state.associatedCustomPolicies }
                        handleActions={this.handleActions}
                        type="policy"
                        name="Custom Policies"/>
                    </Row>
                    <Row>
                      <PolicyDetail selectedPolicy={this.state.selectedPolicy}/>
                    </Row>
                  </Tab>
                </Tabs>
              </Col>
              <Col md={4}>
                <h4 style={styles.h4}>Service and Resource Selection</h4>
                <Col>
                  <Row>
                    <ListPanel checked={true} items={ this.state.services } name="Services" type="service" handleActions={this.handleActions}/>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <ListPanel checked={true} items={ this.state.actions } name="Associated Actions" type="action" handleActions={this.handleActions}/>
                  </Row>
                  <Row>
                    <ListPanel checked={true} items={ this.state.actions } name="All Actions" type="action" handleActions={this.handleActions}/>
                  </Row>
                </Col>
              </Col>
              <Col md={3}>
              <h4 style={styles.h4}>Evaluation Results
              <Button style={styles.simulateButton} bsSize="default" bsStyle="primary" >Simulate</Button>
              </h4>
              <hr></hr>
              
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

export default Dashboard; 
