import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const PolicyBreakdown = () => {
  return (
    <Panel> 
      <Panel header="Conditions">
        <ListGroup>
          <ListGroupItem> 
          Insert Condition 1
          </ListGroupItem>
          <ListGroupItem> 
          Insert Condition 2
          </ListGroupItem>
        </ListGroup>
      </Panel>
    </Panel>
  );
};

export default PolicyBreakdown;