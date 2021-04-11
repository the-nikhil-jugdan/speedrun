import React, { Component } from "react";
import { Button, Row, Col } from "react-materialize";
import { APIContext } from "../../context";
import AddModel from "./addModel";
import ModelList from "./modelList";

class index extends Component {
  render() {
    return (
      <div>
        <AddModel />
        <Row>
          <Col m={10}>
            <h6>Models</h6>
          </Col>
          <Col>
            <Button
              onClick={() => {
                document.getElementById("addModalButton").click();
              }}
            >
              Add Model
            </Button>
          </Col>
        </Row>

        <ModelList />
      </div>
    );
  }
}

index.contextType = APIContext;
export default index;
