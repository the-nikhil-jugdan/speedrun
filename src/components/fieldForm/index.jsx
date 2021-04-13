import { Field } from "../../models";
import React, { Component } from "react";
import { Select, TextInput, Checkbox, Button } from "react-materialize";
import { APIContext } from "../../context";
import { sequelize_db_types } from "./util";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      defaultValue: "",
      allowNull: false,
      fieldName: "",
    };
  }

  changeType = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  modifyFormElement = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addField = () => {
    const { addFieldToModel, field_name } = this.props;
    const field = new Field();
    addFieldToModel(field_name, field);
  };

  render() {
    const { type, fieldName, defaultValue, allowNull } = this.state;
    const { modifyFormElement, addField } = this;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextInput
            name="fieldName"
            defaultValue={fieldName}
            label="Field Name"
            onChange={modifyFormElement}
          />

          <Select label="Data Type" multiple={false} value={type}>
            {Array.from(sequelize_db_types.keys()).map((key) => {
              return (
                <option key={key} value={key}>
                  {sequelize_db_types.get(key)}
                </option>
              );
            })}
          </Select>

          <TextInput
            name="defaultValue"
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "5%",
          }}
        >
          <Button onClick={addField}>Save</Button>
        </div>
      </div>
    );
  }
}

index.contextType = APIContext;
export default index;
