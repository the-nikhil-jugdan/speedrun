import React, { Component } from "react";
import { Button, TextInput } from "react-materialize";
import { APIContext } from "../../context";
import { Model } from "../../models";

class index extends Component {
  render() {
    const { tableName, modelName } = this.state;
    const { addModelToAPI, changeTableName, changeModelName } = this;
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginRight: "20px",
            }}
          >
            <TextInput
              value={modelName}
              onChange={changeModelName}
              label="Model Name"
            />
          </div>
          <div
            style={{
              marginRight: "20px",
            }}
          >
            <TextInput
              label="Table Name"
              onChange={changeTableName}
              value={tableName}
            />
          </div>
          <Button onClick={addModelToAPI}>Save</Button>
        </div>
      </div>
    );
  }

  constructor(props, context) {
    super(props);
    const { match } = this.props;
    const model_name = match.params.name;
    if (model_name === "0") {
      this.state = {
        modelName: "",
        tableName: "",
      };
    } else {
      const movie = context.apiState.models.get(model_name);
      this.state = {
        modelName: movie.modelName,
        tableName: movie.tableName,
      };
    }
  }

  clear = () => {
    this.setState({
      modelName: "",
      tableName: "",
    });
  };

  addModelToAPI = () => {
    const { addModel, editModel } = this.context;
    const model = new Model();
    const { match } = this.props;
    const model_name = match.params.name;
    model.modelName = this.state.modelName;
    model.tableName = this.state.tableName;
    if (model_name === "0") {
      addModel(this.state.modelName, model);
    } else {
      editModel(model_name, model);
    }
    this.clear();
    this.props.history.push("/models");
  };

  changeTableName = (e) => {
    this.setState({
      tableName: e.target.value,
    });
  };

  changeModelName = (e) => {
    this.setState({
      modelName: e.target.value,
    });
  };
}

index.contextType = APIContext;

export default index;
