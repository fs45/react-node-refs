import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Radio from 'react-bootstrap/lib/Radio';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import { postRegister } from '../../../utils/index.js';
import { Redirect } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.style = {
      marginRight: '300px',
      marginLeft: '300px'
    };
    this.style = this.props.styleOverride ? {} : this.style;
  }

  handleSubmit(e) {
    e.preventDefault();
    const {email, password, firstName, lastName, city, state, profileUrl } = this.state;
    postRegister({
      email,
      password,
      firstName,
      lastName, 
      city,
      state,
      profileUrl
    })
    .then(() => {
      console.log('register successful');
      this.setState({ authenticated: true });
    })
    .catch(err => console.log(err));
  }

  handleChange({ target }) {
    if (target.value === 'on') {
      target.value = true;
    } 
    if (target.value === 'off') {
      target.value = false;
    }
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
    } else {
      return (
        <div style = { this.style }>
          <Form horizontal onSubmit={ this.handleSubmit }>
            <FormGroup controlId="email" onChange={ this.handleChange } >
              <Col componentClass={ControlLabel} sm={2}>
                Email Address:
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder=" " />
              </Col>
            </FormGroup>
            <FormGroup controlId="emailCheck" onChange={ this.handleChange } >
              <Col componentClass={ControlLabel} sm={2}>
                Email Confirmation:
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder=" " />
              </Col>
            </FormGroup>

             <FormGroup controlId="password" onChange={ this.handleChange }>
              <Col componentClass={ControlLabel} sm={2}>
                Password:
              </Col>  
              <Col sm={10}>
                <FormControl type="password" placeholder=" " />
              </Col>
            </FormGroup>
            <FormGroup controlId="passwordCheck" onChange={ this.handleChange }>
              <Col componentClass={ControlLabel} sm={2}>
                Password Confirmation:
              </Col>  
              <Col sm={10}>
                <FormControl type="password" placeholder=" " />
              </Col>
            </FormGroup>

            <FormGroup controlId="firstName" onChange={ this.handleChange } >
              <Col componentClass={ControlLabel} sm={2}>
                First Name:
              </Col>
              <Col sm={10}>
                <FormControl type="name" placeholder=" " />
              </Col>
            </FormGroup>
            <FormGroup controlId="lastName" onChange={ this.handleChange } >
              <Col componentClass={ControlLabel} sm={2}>
                Last Name:
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder=" " />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                City:
              </Col>
              <Col sm={3}>
                <FormControl 
                  type="text" 
                  placeholder="" 
                  onChange={ (e) => { e.target.id = 'city'; this.handleChange(e); }}
                />
              </Col>
              <Col componentClass={ControlLabel} sm={1}>
                State:
              </Col>
              <Col sm={2}>
                <FormControl
                  type="text" 
                  placeholder="CA" 
                  onChange={ (e) => { e.target.id = 'state'; this.handleChange(e); }}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Gender: 
              </Col>
              <Col sm={10}>
                <Radio 
                inline
                checked={ this.state.gender === 'male' ? true : false }
                onChange={this.handleChange.bind(null, {target: {id: 'gender', value: 'male'}})}>
                  Male
                </Radio>
                <Radio 
                inline 
                checked={ this.state.gender === 'female' ? true : false }
                onChange={this.handleChange.bind(null, {target: {id: 'gender', value: 'female'}})}>
                  Female
                </Radio>
              </Col>
            </FormGroup>

            <FormGroup controlId="profileUrl" onChange={ this.handleChange } >
              <Col componentClass={ControlLabel} sm={2}>
                Personalized URL: 
              </Col>
              <Col sm={2} style={{marginRight: '80'}}>
                <FormControl.Static>https://awspolicyadvisor.com/</FormControl.Static>
              </Col>
              <Col sm={2}>
                <FormControl type="text" placeholder="myURL" />
              </Col>
            </FormGroup>

            <FormGroup controlId="agreeTerms">
              <Col componentClass={ControlLabel} sm={2}>
              </Col>
              <Col em = {5} > 
                <Checkbox
                  inline
                  onChange={(e) => {e.target.id='agreeTerms'; this.handleChange(e)}}
                  >
                I agree the Terms of Use and the Privacy Policy
                </Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">
                  Register
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );
    }
  }
}

export default Register;
