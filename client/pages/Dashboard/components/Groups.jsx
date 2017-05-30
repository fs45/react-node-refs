import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';

const styles = {
  list: { 
    overflow: 'auto',
    maxHeight: '29vh',
    overflowX: "hidden",
    borderColor: '#d6d7d8',
    borderStyle: 'solid',
    borderWidth: '0.5px',
    borderRadius: '5px',
    padding: 0,
    margin: 0
  },
  listitem: {
    margin: 0,
    fontSize: '12px',
    height: '30px'
  },
  header: {
    padding: 0,
    margin: 0,
    height: '50%'
  }
};

const Groups = (props) => {
  return (
    <Panel header="Groups" style={styles.header}>
      <ListGroup style={styles.list}>
        { 
          props.groups.map(group => {
            return (
              <ListGroupItem style={styles.listitem}
                onClick={ (e) => props.handleActions({ 
                  action: 'select', 
                  payload: {type: 'group', id: group.GroupId } })}
                > 
                {group.GroupName} 
              </ListGroupItem>)
          })
        }
      </ListGroup>
    </Panel>
  );
}

export default Groups;



