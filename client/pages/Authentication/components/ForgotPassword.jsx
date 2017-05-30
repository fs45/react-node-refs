import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    // send password reset link.
  }

  handleChange({ target }) { 
    this.setState({ [target.id]: target.value });
  }

  render() {
    return (
      <div style = {this.style}> 
        <p>We'll send you a password reset link.</p>
        <Form horizontal onSubmit={ this.handleSubmit }>
          <FormGroup controlId="email" onChange={ this.handleChange } >
            <Col componentClass={ControlLabel} sm={2}>
              Email:
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup> 
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Send
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;
