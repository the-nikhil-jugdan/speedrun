import React, { Component , createContext } from 'react';
import {API} from '../models'

export const APIContext = createContext()

export class APIProvider extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      ...new API()
    }
  }
  
  addModel = (name,model) => {
    const models = new Map(this.state.models)
    if (name in models) {
      return {
        code: -1,
        error: 'Model already exists'
      }
    } else {
      models[name] = model
    }
    this.setState({models})
  }  

  removeModel = (name) => {
    let models = this.state.models
    if (name in models) {
      models = new Map(models)
      models.delete(name)
      this.setState({models})
    } 
  }

  editModel = (name, model) => {
    const models = new Map(this.state.models)
    if (name in models) {
      models[name] = model
      this.setState({models})
    }
  }

  removeAllModels = () => {
    const models = new Map()
    this.setState({models})
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
