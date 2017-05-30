import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import NavItem from 'react-bootstrap/lib/NavItem';
import Button from 'react-bootstrap/lib/Button';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class Filterbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    // save it in the component state
    // accomplish the search by bubbling the event up the parent
    // you have to debounce the search calls first though.
    // have a drop down so user can select from it
    // on dropdown user select make a select handle action.
    this.setState({
      searchTerm: e.target.value
      // results: this.props.handleActions({action: 'search', payload: e.target.value })
    });
  }

  handleFilter(e) {
    this.props.handleActions({ action: 'filter', payload: e });
  }

  handleSearch() {
    this.props.handleActions({action: 'search', payload: this.state.searchTerm });
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) {
      this.handleSearch();

    }
  }

  render() {
    return (
      <Nav bsStyle="pills" onSelect={this.handleFilter} style={{borderStyle: 'solid', borderColor: '#efeded', borderWidth:'1px', backgroundColor: '#efeded2', margin:'0px'}}>
        <NavItem eventKey={'all'}>All</NavItem>
        <NavItem eventKey={'commonlyUsed'}>Commonly Used</NavItem>
        <NavItem eventKey={'saved'}>Saved</NavItem>
        <NavItem eventKey={'lastAccessed'}>Last Accessed</NavItem>
        <Navbar.Form pullRight onSubmit={ this.handleSearch }>
          <FormGroup>
            <FormControl type="text" placeholder="type any entity..." onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
          </FormGroup>
          {' '}
          <Button type="submit" onClick={this.handleSearch} >Search</Button>
        </Navbar.Form>
      </Nav> 
    );
  }
}

export default Filterbar;

  
  