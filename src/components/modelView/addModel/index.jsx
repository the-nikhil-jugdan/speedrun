import React, { Component } from 'react';
import {Modal,Button,TextInput} from 'react-materialize'
import {APIContext} from '../../../context'
import {Model} from '../../../models'

class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modelName: '',
      tableName: ''
    }
  }

  clear = () => {
    this.setState({
      modelName: '',
      tableName: ''
    })
  }

  addModelToAPI = () => {
    const { addModel } = this.context
    const model = new Model()
    model.modelName = this.state.modelName
    model.tableName = this.state.tableName
    addModel(this.state.modelName, model)
    this.clear()
  }

  changeTableName = (e) => {
    this.setState({
      tableName: e.target.value,
    })
  }

  changeModelName = (e) => {      
    this.setState({
      modelName:e.target.value
    })
  }

  render() {
    const {tableName,modelName} = this.state
    const {addModelToAPI,changeTableName,clear,changeModelName} = this
    return (
      <div>
        <Modal
          actions={[
            <Button flat onClick={addModelToAPI} modal="close" node="button" waves="green">Save</Button>,
            <Button flat onClick={clear} modal="close" node="button" waves="red">Cancel</Button>
          ]}
          trigger={
            <Button node="button"
              id="addModalButton"
              style={{
                display:'none'
              }}
            >
              Add Model
            </Button>
          }
        >
          <div style={{
            display: 'flex'
          }}>
            <div style={{
              paddingRight:'20px'
            }}>
              <TextInput
                value={modelName}
                onChange={changeModelName}
                label="Model Name"
              />
            </div>
            <TextInput
              label="Table Name"
              onChange={changeTableName}
              value={tableName}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

index.contextType = APIContext

export default index;