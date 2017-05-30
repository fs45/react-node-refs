import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import JSONPretty from 'react-json-pretty';
import Panel from 'react-bootstrap/lib/Panel';
import ServiceSecurityDiagram from './ServiceSecurityDiagram.jsx';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const stub = {
  "Version": "2012-10-17",
  "Statement": [
      {
          "Action": "ec2:*",
          "Effect": "Allow",
          "Resource": "*"
      },
      {
          "Effect": "Allow",
          "Action": "elasticloadbalancing:*",
          "Resource": "*"
      },
      {
          "Effect": "Allow",
          "Action": "cloudwatch:*",
          "Resource": "*"
      },
      {
          "Effect": "Allow",
          "Action": "autoscaling:*",
          "Resource": "*"
      }
  ]
}

const detail_styles = {
  predetail: { 
    height: '60vh',
    display: 'block'
  },
  predetail_hide: { 
    height: '60vh',
    display: 'block'
  }
};

class PolicyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false,
      style_pre: detail_styles.predetail
    }
    this.handleActions = this.handleActions.bind(this);
    if(this.props.selectedPolicy.Document){
      this.setState({showModal: false, style_pre: detail_styles.predetail});
    }
    else{
      this.setState({showModal: false, style_pre: detail_styles.predetail_hide});
    }
  }

  handleActions({action}) {
  
    const actions = {
      open: () => this.setState({ showModal: true }),
      close: () => this.setState({ showModal: false })
    }
    actions[action](); 
  }
  render() {
    const doc = this.props.selectedPolicy.Document ? JSON.parse(this.props.selectedPolicy.Document) : {};
    
    // const doc = JSON.parse(this.props.selectedPolicy.Document);
    return (
      <Panel>
        <JSONPretty json={doc} style={this.state.style_pre}></JSONPretty>
      </Panel>
    );
  }
}

export default PolicyDetail;