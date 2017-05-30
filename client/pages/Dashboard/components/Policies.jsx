import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';

const styles = {
  list: { 
    overflow: 'auto',
    maxHeight: '15vh',
    overflowX: "hidden",
    borderColor: '#d6d7d8',
    borderStyle: 'solid',
    borderWidth: '0.5px',
    borderRadius: '5px'
  }
};

const Policies = (props) => {

  return (
    <Panel header={props.policyType + ' Policies'}>
      {
        props.policies.length ? 
        <ListGroup style={styles.list}>
          { 
            props.policies.map(policy =>
              (
                <ListGroupItem
                  value={ policy.PolicyId }
                  onClick={ (e) => props.handleActions({
                    action: 'select', 
                    payload: {type: 'policy', id: policy.PolicyId, policyTypeId: policy.PolicyTypeId } 
                  }) }
                  > 
                  {policy.PolicyName} 
                </ListGroupItem>)
            )
          }
        </ListGroup>
        : 
        <p style={{color: '#b5b6b7'}}>No policies found for the selection </p>        
      }
    </Panel>
  );
}

export default Policies;

