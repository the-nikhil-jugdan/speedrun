import React, { Component , createContext } from 'react';
import {API} from '../models'

export const APIContext = createContext()

export class APIProvider extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      api : new API()
    }
  }
  
  addModel = (name,model) => {
    const models = new Map(this.state.api.models)
    if (name in models) {
      return {
        code: -1,
        error: 'Model already exists'
      }
    } else {
      models[name] = model
    }
    const api = new API()
    api.models = models
    api.dbConnection = this.state.api.dbConnection
    this.setState({api})
  }  

  removeModel = (name) => {
    let models = this.state.models
    if (name in models) {
      models = new Map(models)
      models.delete(name)
      const api = new API()
      api.models = models
      api.dbConnection = this.state.api.dbConnection
      this.setState({api})
    } 
  }

  editModel = (name, model) => {
    const models = new Map(this.state.models)
    if (name in models) {
      models[name] = model
      const api = new API()
      api.models = models
      api.dbConnection = this.state.api.dbConnection
      this.setState({api})
    }
  }

  removeAllModels = () => {
    const models = new Map()
    const api = new API()
    api.models = models
    api.dbConnection = this.state.api.dbConnection
    this.setState({api})
  }
  
  render() {
    const { props } = this
    const apiState = this.state
    const { addModel, removeModel, editModel, removeAllModels } = this
    return (
      <APIContext.Provider value={apiState,addModel,removeModel,removeAllModels,editModel}>
        {props.children}
      </APIContext.Provider>
    );
  }
}
