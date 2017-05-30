import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';

// mode and diagram


const ServiceSecurityDiagram = (props) => {
  const title = (<h5> Service Security Diagram </h5>)
  const diagramPath = './assets/diagrams/'
  const fileName = props.diagram ? props.diagram : 'AmazonEC2FullAccess.png';
  if (props.mode === 'thumbnail') {
    return (
      <div>
        <Panel header={title} >
          <Image src={ diagramPath + props.diagram } className="center-block" className="img-responsive" style={{maxHeight: '200px'}}/>
          { (props.mode === 'thumbnail') ? 
          (<Button style={{float: 'right'}} onClick={() => props.handleActions({action: 'open'})}
            >Enlarge </Button>) : null }
        </Panel>
      </div> 
    );
  } else {
    return (
      <div>
        <Panel header={title}>
          <Image src={ diagramPath + props.diagram } className="img-responsive"/>
        </Panel>
      </div>); 
  }
}

export default ServiceSecurityDiagram;

// onClick={props.handleActions({action: 'open'})} 