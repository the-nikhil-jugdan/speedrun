import React, { Component } from 'react';
import { Button ,Row,Col } from 'react-materialize';
import {APIContext} from '../../context'

class index extends Component {
  render() {
    const { apiState } = this.context
    return (
      <div>
        <Row>
          <Col m={10}>
            <h6>Models</h6>
          </Col>
          <Col>
            <Button>Add Model</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

index.contextType = APIContext
export default index;