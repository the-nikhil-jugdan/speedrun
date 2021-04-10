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
    const models = new Map()
    this.state.models.forEach((value, key) => {
      models.set(key,value)
    })
    if (this.state.models.has(name)) {
      return {
        code: -1,
        error: 'Model already exists'
      }
    } else {
      models.set(name,model)
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
  
  changeName = (e) => {
    this.setState({name:e.target.value})
  }

  render() {
    const { props } = this
    const apiState = this.state
    const { addModel, removeModel, editModel, removeAllModels, changeName } = this
    const contextPassValue = {
      apiState,
      addModel,
      removeModel,
      removeAllModels,
      editModel,
      changeName
    }
    return (
      <APIContext.Provider value={contextPassValue}>
        {props.children}
      </APIContext.Provider>
    );
  }
}
