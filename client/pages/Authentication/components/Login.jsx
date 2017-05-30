import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { postLogin } from '../../../utils/index.js';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.style = {
      marginRight: '400px',
      marginLeft: '400px'
    };
    this.style = this.props.styleOverride ? {} : this.style;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    postLogin({
      email,
      password,
    })
    .then(() => {
      // route to the dashboard
      console.log('login successful')
      this.setState({ authenticated: true });
    })
    .catch(err => console.log(err));

  }

  handleChange({ target }) { 
    this.setState({ [target.id]: target.value });
  }

  render() {
    if (this.state.authenticated) {
      return (
        <Redirect to={{
          pathname: '/dashboard',
          state: { email: this.state.email }
        }}/>
      );
    }
    return (
      <div style = {this.style}> 
        <p>Already have an account? Login here.</p>
        <Form horizontal onSubmit={ this.handleSubmit }>
          <FormGroup controlId="email" onChange={ this.handleChange } >
            <Col componentClass={ControlLabel} sm={2}>
              Email:
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup> 
           <FormGroup controlId="password" onChange={ this.handleChange }>
            <Col componentClass={ControlLabel} sm={2}>
              Password:
            </Col>  
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Log in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;
