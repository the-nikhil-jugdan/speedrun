import React, { Component } from "react";
import { Button, TextInput } from "react-materialize";
import { APIContext } from "../../context";
import { Field, Model } from "../../models";
import FieldForm from "../fieldForm";
class index extends Component {
  render() {
    const { tableName, modelName, fields } = this.state;
    const {
      addModelToAPI,
      changeTableName,
      changeModelName,
      addFieldToModel,
      addFieldForm,
    } = this;
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

        <Button onClick={addFieldForm}>Add Field</Button>

        {Array.from(fields.keys()).map((key) => {
          return (
            <div
              style={{
                border: "1px solid #D8D8D8",
                marginTop: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "10px",
              }}
            >
              <FieldForm
                addFieldToModel={addFieldToModel}
                field_name={key}
                addFieldForm={addFieldForm}
                field={fields.get(key)}
              />
            </div>
          );
        })}
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
        fields: new Map(),
      };
    } else {
      const model = context.apiState.models.get(model_name);
      const fields = new Map();
      model.fields.forEach((value, key) => {
        fields.set(key, value);
      });
      this.state = {
        modelName: (" " + model.modelName).slice(1),
        tableName: (" " + model.tableName).slice(1),
        fields: fields,
      };
    }
  }

  clear = () => {
    this.setState({
      modelName: "",
      tableName: "",
    });
  };

  addFieldForm = () => {
    const field = new Field();
    const fields = new Map();
    fields.set("temp", field);
    this.state.fields.forEach((value, key) => {
      fields.set(key, value);
    });
    this.setState({ fields });
  };

  addModelToAPI = () => {
    const { addModel, editModel } = this.context;
    const model = new Model();
    const { match } = this.props;
    const model_name = match.params.name;
    model.modelName = this.state.modelName;
    model.tableName = this.state.tableName;
    model.fields = this.state.fields;
    if (model_name === "0") {
      addModel(model.modelName, model);
    } else {
      editModel(model.modelName, model);
    }
    this.clear();
    this.props.history.push("/models");
  };

  addFieldToModel = (name, field) => {
    this.setState((state) => {
      const fields = new Map(state.fields).set(name, field);
      fields.delete("temp");
      const newState = {
        ...state,
        fields,
      };
      return newState;
    });
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
