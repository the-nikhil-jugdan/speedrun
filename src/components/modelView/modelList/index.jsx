import React, { Component } from "react";
import { APIContext } from "../../../context";
import { Card, Button } from "react-materialize";
import { Link } from "react-router-dom";

class index extends Component {
  render() {
    const models = this.context.apiState.models;
    const { removeModel } = this.context;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px",
          gridAutoRows: "minmax(100px, auto)",
        }}
      >
        {Array.from(models.keys()).map((key) => {
          return (
            <Card
              key={key}
              actions={[
                <Link to={`model/${key}`}>
                  <Button style={{ marginRight: "5px" }}>Edit Model</Button>
                </Link>,
                <Button onClick={removeModel} name={key}>
                  Remove Model
                </Button>,
              ]}
            >
              <h4>{key}</h4>
            </Card>
          );
        })}
      </div>
    );
  }
}

index.contextType = APIContext;
export default index;
