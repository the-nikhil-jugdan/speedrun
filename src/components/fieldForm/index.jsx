import { Field } from "../../models";
import React, { Component } from "react";
import { Select, TextInput, Checkbox, Button } from "react-materialize";
import { APIContext } from "../../context";
import { sequelize_db_types } from "./util";

class index extends Component {
  render() {
    const {
      type,
      fieldName,
      defaultValue,
      allowNull,
      unique,
      refernceModel,
      referenceKey,
      deferable,
    } = this.state;
    const { modifyFormElement, addField, changeType } = this;
    const { models } = this.context.apiState;
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
            id={fieldName + "tctBox"}
          />

          <Select
            label="Data Type"
            multiple={false}
            value={type}
            id={fieldName + "select"}
            onChange={changeType}
          >
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
            id={fieldName + "defaultValue"}
          />

          <Checkbox
            filledIn
            name="allowNull"
            label="Allow Null"
            checked={allowNull}
            onChange={(e) => {
              this.setState({ allowNull: !this.state.allowNull });
            }}
            id={fieldName + "chkbx"}
          />
          <Checkbox
            filledIn
            name="unique"
            label="Unique"
            checked={unique}
            onChange={(e) => {
              this.setState({ unique: !this.state.unique });
            }}
            id={fieldName + "uqchkbx"}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "5%",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "flex-start",
              alignItems: "center",
              marginRight: "2%",
            }}
          >
            <p
              style={{
                marginLeft: "2%",
                marginRight: "4%",
              }}
            >
              Refers
            </p>
            <div
              style={{
                marginRight: "4%",
              }}
            >
              <Select
                label="Reference Model"
                multiple={false}
                value={refernceModel}
                onChange={(e) => {
                  this.setState({
                    refernceModel: e.target.value,
                  });
                }}
              >
                <option key="empty" value="">
                  Select a Model
                </option>
                {Array.from(models.keys()).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {models.get(key).modelName}
                    </option>
                  );
                })}
              </Select>
            </div>
            {refernceModel != "" ? (
              <div
                style={{
                  marginRight: "4%",
                }}
              >
                <Select
                  multiple={false}
                  label="Key"
                  value={referenceKey}
                  onChange={(e) => {
                    this.setState({
                      referenceKey: e.target.value,
                    });
                  }}
                >
                  <option key={"empty"} value="">
                    Select a key
                  </option>
                  {Array.from(models.get(refernceModel).fields.keys()).map(
                    (key) => {
                      return (
                        <option key={key} value={key}>
                          {models.get(refernceModel).fields.get(key).fieldName}
                        </option>
                      );
                    }
                  )}
                </Select>
              </div>
            ) : (
              ""
            )}

            {refernceModel != "" ? (
              <div>
                <Checkbox
                  filledIn
                  name="isDeffered"
                  label="Defferable"
                  checked={deferable}
                  onChange={(e) => {
                    this.setState({ deferable: !this.state.deferable });
                  }}
                  id={fieldName + "deferable"}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <Button onClick={addField}>Save</Button>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    const { field_name } = props;
    if (field_name === "temp")
      this.state = {
        type: "DataTypes.STRING",
        defaultValue: "",
        allowNull: false,
        fieldName: "",
        unique: false,
        refernceModel: "",
        referenceKey: "",
        deferable: false,
      };
    else {
      const { field } = props;
      this.state = {
        type: field.type,
        defaultValue: field.defaultValue,
        allowNull: field.allowNull,
        fieldName: field.fieldName,
        unique: field.unique,
        refernceModel: "",
        referenceKey: "",
        deferable: false,
      };
    }
  }

  clear = () => {
    this.setState({
      type: "DataTypes.STRING",
      defaultValue: "",
      allowNull: false,
      fieldName: "",
      unique: false,
    });
  };

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
    const { addFieldToModel, addFieldForm } = this.props;
    const field = new Field();
    field.type = this.state.type;
    field.defaultValue = this.state.defaultValue;
    field.allowNull = this.state.allowNull;
    field.fieldName = this.state.fieldName;
    field.unique = this.state.unique;
    addFieldToModel(field.fieldName, field);
    this.clear();
  };
}

index.contextType = APIContext;
export default index;
