import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';  
import Panel from 'react-bootstrap/lib/Panel';

const styles = {
  primary: {
    borderStyle: 'solid',
    borderColor: '#1f3233',
    borderWidth:'1px'
  },
  secondary: {
    borderWidth: '0px'
  },
}


const Services = (props) => {
const iconsPath = './assets/icons/';
  return (
    <Panel header="Services"> 
      <Well style={{ overflow: 'auto', maxHeight: '60vh'}}>
        <Row>
            { props.services.map(service => {
              return (
                <Col md={6}>
                  <Thumbnail
                    rounded 
                    src={ iconsPath + service.IconPath }
                    onClick={(e) => {
                      props.handleActions({
                        action: 'select', 
                        payload:{type: 'service', id:service.ServiceId }}) 
                      }
                      // e.target.style() // change it to emphasis.
                    }
                  />
                </Col>
              );
            })}
        </Row>
      </Well>
    </Panel>
  );
}

export default Services;