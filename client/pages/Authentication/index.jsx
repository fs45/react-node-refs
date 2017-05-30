import React from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleActions = this.handleActions.bind(this);
  }

  handleActions({ action, payload }) {
    const actions = {
      login: (userInfo) => {
        // submit to the server
        console.log(userInfo);
      },
      register: (userInfo) => {
        console.log(userInfo);
      }
    };
    actions[action](payload);
  }

  render() {
    return (
      <div>
        <div style={{marginTop: '30px', marginBottom: '30px', marginLeft: '90px', marginRight:'90px' }}>
          <Row> 
            <Col sm={7} style={{paddingRight: '40px'}}>
              <Register styleOverride={true} handleActions={this.handleActions} />
            </Col>
            <Col sm={5} style={{backgroundColor: '#d6d4d4', padding: '20px', borderRadius: '10px'}}>
              <Login styleOverride={true} handleActions={this.handleActions} />
            </Col>
          </Row>

        </div>
      </div>
    );
  }
}

export default Authentication;
// <Register register={ this.handleActions }/>
//         <Login login={ this.handleActions }/>
// <Login login={ this.handleActions }/>