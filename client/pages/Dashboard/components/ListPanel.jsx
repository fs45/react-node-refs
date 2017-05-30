import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import _ from 'lodash';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import { tableToFieldName } from '../../../utils/index.js';

const styles = {
  list: { 
    overflow: 'auto',
    maxHeight: '20vh',
    overflowX: "hidden" 
  },
  listItem: {
    fontSize: '12px',
    height: '30px',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  },
  nav: {
    margin: 0,
    padding: 0,
    height: '40px'
  },
  searchBox: {
    width: '100',
  },
  navHeader: {
    fontSize: '14',
    margin: 0
  },
  microButtons: {
   marginRight: '0px'
  }
};

// ListPanel:
// props.items
// props.name: eg. 'role'

const makeActionPayload = (type, entity) => {
  // can customize based on selection
  return { type, entity };
}

class ListPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.filterList = this.filterList.bind(this);
    this.sortList = this.sortList.bind(this);
    this.state = {
      items: props.items,
      searchTerm: '',
      descendingSort: false,
      selectedItemId: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    _.isEqual(this.props.items, nextProps.items) ? null : 
    this.setState({
      items: nextProps.items
    });
    // update selection
    if (nextProps.highlight && this.state.selectedItemId !== nextProps.highlight.IamResourceId) {
      this.setState({
        selectedItemId: nextProps.highlight.IamResourceId
      });
    }
  }

  handleSelection(e, selection) {
    this.props.checked ? null : e.preventDefault();
    if (typeof selection === 'object') {
      this.props.handleActions({ 
        action: 'select', 
        payload: makeActionPayload(this.props.type, selection)
      });
      // if items are from IamResource use that else use its own id:
      // if (selection.IamResourceId) {
      //   if (!this.props.checked) {
      //     this.setState({selectedItemId: selection.IamResourceId});
      //   } 
      // } else {
      //   if (!this.props.checked) {
      //     this.setState({selectedItemId: selection[tableToFieldName(this.props.type)+'Id']});
      //   }
      // }
    } else {
      if (selection === 'search') {
        // this.state.searchTerm -> request that.
        // Ask venkat if that is absolutely needed? 
      } else {
        // clear the search selection and grab all back.
        this.setState({
          searchTerm: '',
          items: this.props.items,
          selectedItemId: 0
        });
      }
    }
  }

  sortList() {
    if (this.state.items[0].ResourceName) {
      if (this.state.descendingSort) {
        this.setState({
          items: this.state.items.sort((a, b) => a.ResourceName < b.ResourceName ? 1 : -1),
          descendingSort: false
        })
      } else {
        this.setState({
          items: this.state.items.sort((a, b) => a.ResourceName > b.ResourceName ? 1 : -1),
          descendingSort: true
        });
      }
    } else {
      if (this.state.descendingSort) {
        this.setState({
          items: this.state.items.sort((a, b) => 
            a[tableToFieldName(this.props.type)+'Name'] < b[tableToFieldName(this.props.type)+'Name'] ? 1 : -1),
          descendingSort: false
        })
      } else {
        this.setState({
          items: this.state.items.sort((a, b) => 
            a[tableToFieldName(this.props.type)+'Name'] > b[tableToFieldName(this.props.type)+'Name'] ? 1 : -1),
          descendingSort: true
        });
      }
    }
  }

  filterList(value) {
    if (this.props.items[0].ResourceName) {
      this.setState({
        items: this.props.items.filter((item) => 
          item.ResourceName.includes(value))
      });
    } else {
      this.setState({
        items: this.props.items.filter((item) => 
          item[tableToFieldName(this.props.type)+'Name'].includes(value))
      });
    }
  } 

  render() {
    return (
      <div>
        <Navbar style={styles.nav} fluid={true}>
          <Navbar.Header style={{height: '40px'}}>
            <Navbar.Brand style={styles.navHeader} onClick={ this.sortList }>
              {this.props.name}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    style={styles.searchBox}
                    type="text" 
                    value={this.state.searchTerm}
                    placeholder="search..."
                    onChange={(e) => {this.setState({searchTerm: e.target.value}); this.filterList(e.target.value);}}/>
                  <InputGroup.Button>
                     <Button onClick={ (e) => this.handleSelection(e, 'clear') }> ✕ </Button>
                  </InputGroup.Button>
                  {this.props.checked ? <InputGroup.Addon><input type="checkbox"/>All</InputGroup.Addon> : ''}
                </InputGroup>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Panel>
          <ListGroup style={styles.list} fill>
            { this.state.items.length ? 
              this.state.items.map(item => {
                const comps = ['User', 'Group Membership', 'Role'];

                if (comps.indexOf(this.props.name) != -1)
                  styles.list.maxHeight = '25vh';
                else
                  styles.list.maxHeight = '20vh';

                return (

                  <ListGroupItem
                    style={ styles.listItem }
                    active={(item[tableToFieldName(this.props.type) + 'Id'] === this.state.selectedItemId) ? true : false}
                    key={item.IamResourceId ? item.IamResourceId.toString() : item[tableToFieldName(this.props.type) + 'Id']}
                    onClick={
                      (e) => { return this.handleSelection(e, item); } 
                    }>
                    {this.props.checked ? 
                      <Checkbox inline> 
                        { item.ResourceName ? item.ResourceName : item[tableToFieldName(this.props.type)+'Name'] } 
                      </Checkbox>
                      : (item.ResourceName ? item.ResourceName : item[tableToFieldName(this.props.type)+'Name'])
                    }
                  </ListGroupItem>)
              })
              :
              <ListGroupItem style={ styles.listItem } >Selection not found</ListGroupItem>
            }
          </ListGroup>
        </Panel>
      </div> 
    );
  }
};


ListPanel.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
  type: PropTypes.string,
  handleActions: PropTypes.func,
  checked: PropTypes.bool,
};

export default ListPanel;

// Button Group Component:
/*<ButtonGroup style={styles.microButtons}>
  <Button onClick={ (e) => this.handleSelection(e, 'search') }> ► </Button> 
  <Button onClick={ (e) => this.handleSelection(e, 'clear') }> ✕ </Button>
</ButtonGroup> */



