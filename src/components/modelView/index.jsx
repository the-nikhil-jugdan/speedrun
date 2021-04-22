import React, { Component } from "react";
import { Button, Row, Col } from "react-materialize";
import { APIContext } from "../../context";
import ModelList from "./modelList";
import { Link } from "react-router-dom";
class index extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col m={10}>
            <h6>Models</h6>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
              }}
            >
              <Link to="/">
                <Button>Home</Button>
              </Link>
              <div
                style={{
                  marginLeft: "10%",
                }}
              >
                <Link to="/model/0">
                  <Button>Add Model</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <ModelList />
      </div>
    );
  }
}

index.contextType = APIContext;
export default index;
