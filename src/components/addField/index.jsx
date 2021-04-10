import React, { Component } from 'react';
import {Card,Select,Row,TextInput,Checkbox} from 'react-materialize'
import {sequelize_db_types} from './util'


class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      defaultValue: '',
      allowNull: false,
      fieldName: ''
    }
  }
  
  changeType = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  modifyFormElement = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
  }

  render() {
    const { type , fieldName, modifyFormElement, defaultValue,allowNull } = this.state
    return (
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >

          <TextInput
                name='fieldName'
                defaultValue={fieldName}
                label="Field Name"
                onChange={modifyFormElement}
          />

          <Select
            label="Data Type"
            multiple={false}
            value={type}
          >
            {
              Array.from(sequelize_db_types.keys()).map(
                (key) => {
                  return (
                    <option key={key} value={key}>
                      {sequelize_db_types.get(key)}
                    </option>
                  )
                }
              )
            }          
          </Select>
  
          <TextInput
                name='defaultValue'
                defaultValue={defaultValue}
                label="Default Value"
                onChange={modifyFormElement}
          />

          <Checkbox
            filledIn
            name="allowNull"
            label="Allow Null"
            value={allowNull}
            onChange={modifyFormElement}
          />

        </div>
      </Card>
    );
  }
}

export default index;