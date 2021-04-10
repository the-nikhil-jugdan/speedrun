import React, { Component } from 'react';
import { Button ,Row,Col } from 'react-materialize';
import { APIContext } from '../../context'
import AddModel from './addModel'

class index extends Component {
  render() {
    const { apiState } = this.context
    console.log(apiState)
    return (
      <div>
        <AddModel/>
        <Row>
          <Col m={10}>
            <h6>Models</h6>
          </Col>
          <Col>
            <Button onClick={
              () => {
                  document.getElementById('addModalButton').click()
                }
            }>Add Model</Button>
          </Col>
        </Row>
        {
          Array.from(apiState.models.keys()).map((key) => {
            return <p>{key}</p>
          })
        }
      </div>
    );
  }
}

index.contextType = APIContext
export default index;