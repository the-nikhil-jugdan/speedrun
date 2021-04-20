import React, { Component, createContext } from "react";
import { API } from "../models";

export const APIContext = createContext();

export class APIProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...new API(),
    };
  }

  addModel = (name, model) => {
    const models = new Map();
    this.state.models.forEach((value, key) => {
      models.set(key, value);
    });
    if (this.state.models.has(name)) {
      return {
        code: -1,
        error: "Model already exists",
      };
    } else {
      models.set(name, model);
    }
    this.setState({ models });
  };

  removeModel = (e) => {
    const name = e.target.name;
    let models = this.state.models;
    if (models.has(name)) {
      models = new Map(models);
      models.delete(name);
      this.setState({ models });
    }
  };

  setPrimaryKey = (model, fieldName) => {
    let models = this.state.models;
    if (models.has(model.modelName)) {
      models = new Map(models);
      model.primaryKey = fieldName;
      models.set(model.modelName, model);
      this.setState({ models });
    }
  };

  editModel = (name, model) => {
    const models = new Map();
    this.state.models.forEach((value, key) => {
      models.set(key, value);
    });
    if (models.has(name)) {
      models.delete(name);
      models.set(model.modelName, model);
      this.setState({ models });
    }
  };

  removeAllModels = () => {
    const models = new Map();
    this.setState({ models });
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };

  changeDBFields = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { props } = this;
    const apiState = this.state;
    const {
      addModel,
      removeModel,
      editModel,
      removeAllModels,
      changeName,
      setPrimaryKey,
      changeDBFields,
    } = this;
    const contextPassValue = {
      apiState,
      addModel,
      removeModel,
      removeAllModels,
      editModel,
      changeName,
      setPrimaryKey,
      changeDBFields,
    };
    return (
      <APIContext.Provider value={contextPassValue}>
        {props.children}
      </APIContext.Provider>
    );
  }
}
