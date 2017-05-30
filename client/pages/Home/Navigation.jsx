import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Authentication from '../Authentication/index.jsx';
import Dashboard from '../Dashboard/index.jsx';
import ForgotPassword from '../Authentication/components/ForgotPassword.jsx'  
import Login from '../Authentication/components/Login.jsx';
import Register from '../Authentication/components/Register.jsx';

const styles = {
  nav: {
    backgroundColor:'#ffc021',
    margin: '0px'
  },
  logo: {
    color: '#5b5b5b',
    fontWeight: '600'
  }
}

const Navigation = (props) => {
  return (
    <Router>
      <div>
        <Navbar style={styles.nav}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/dashboard" style={styles.logo}>AWS Policy Simulator</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#"><Link to="/login">Login</Link></NavItem>
            <NavItem eventKey={2} href="#"><Link to="/password">Forgot Password?</Link></NavItem>
            <NavItem eventKey={3} href="#"><Link to="/register">Sign Up</Link></NavItem>
          </Nav>
        </Navbar>
        <Route exact path='/' component={Authentication}/>
        <Route path='/login' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/password' component={ForgotPassword} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
  );
}

export default Navigation;