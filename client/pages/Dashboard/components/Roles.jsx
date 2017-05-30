import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';

const styles = {
  list: { 
    overflow: 'auto',
    maxHeight: '25vh',
    overflowX: "hidden",
    borderColor: '#d6d7d8',
    borderStyle: 'solid',
    borderWidth: '0.5px',
    borderRadius: '5px'
  }
};

const Roles = (props) => {
  return (
    <Panel header="Roles">
      <ListGroup style={styles.list}>
        { 
          props.roles.map(role => {
            return (
              <ListGroupItem 
                onClick={ (e) => {
                  e.preventDefault();
                  // console.log(e.target);
                  return props.handleActions({ 
                    action: 'select', 
                    payload: {type: 'role', id: role.RoleId } 
                  });
                  }
                }> 
                {role.RoleName} 
              </ListGroupItem>)
          })
        }
      </ListGroup>
    </Panel>
  );
}

export default Roles;

