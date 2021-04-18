import React, { Component } from "react";
import { APIContext } from "../../../context";
import { Card, Button, Select } from "react-materialize";
import { Link } from "react-router-dom";

class index extends Component {
  render() {
    const models = this.context.apiState.models;
    const { removeModel, setPrimaryKey } = this.context;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
          gridAutoRows: "minmax(100px, auto)",
        }}
      >
        {Array.from(models.keys()).map((key) => {
          const model = models.get(key);
          return (
            <Card
              key={key}
              actions={[
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link to={`model/${key}`}>
                    <Button style={{ marginRight: "5px" }}>Edit </Button>
                  </Link>

                  <Button onClick={removeModel} name={key}>
                    Delete
                  </Button>
                  <div
                    style={{
                      marginLeft: "4%",
                      flex: "1",
                    }}
                  >
                    <Select
                      multiple={false}
                      label="Primary Key"
                      value={model.primaryKey}
                      onChange={(e) => {
                        setPrimaryKey(model, e.target.value);
                      }}
                    >
                      <option key="empty" value="">
                        Auto
                      </option>
                      {Array.from(model.fields.keys()).map((fkey) => {
                        const field = model.fields.get(fkey);
                        return (
                          <option key={fkey} value={field.fieldName}>
                            {field.fieldName}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                </div>,
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
