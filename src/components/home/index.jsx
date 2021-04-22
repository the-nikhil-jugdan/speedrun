import React, { Component } from "react";
import { Button, TextInput, Select } from "react-materialize";
import { Link } from "react-router-dom";
import { APIContext } from "../../context";

class index extends Component {
  dialects = new Map();

  constructor(props) {
    super(props);
    this.dialects.set("mysql", "MySQL");
    this.dialects.set("mariadb", "Maria DB");
    this.dialects.set("postgres", "Postgres SQL");
    this.dialects.set("mssql", "Microsoft Server SQL");
  }

  render() {
    const { dialects, sendForGeneration } = this;
    const { apiState, changeName, changeDBFields } = this.context;
    const { username, password, database, host, dialect } = apiState;
    return (
      <>
        <TextInput
          value={apiState.name}
          onChange={changeName}
          label="Project Name"
        />
        <Link to="/models">
          <Button>Models</Button>
        </Link>

        <p
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Database Config
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          <TextInput
            label="Username"
            name="username"
            defaultValue={username}
            onChange={changeDBFields}
          />
          <TextInput
            name="password"
            label="Password"
            defaultValue={password}
            onChange={changeDBFields}
          />
          <TextInput
            label="Database"
            defaultValue={database}
            name="database"
            onChange={changeDBFields}
          />
          <TextInput
            name="host"
            label="Host"
            defaultValue={host}
            onChange={changeDBFields}
          />

          <Select
            name="dialect"
            label="Database"
            defaultValue={dialect}
            onChange={changeDBFields}
          >
            <option key="empty" value="">
              Select a DB
            </option>
            {Array.from(dialects.keys()).map((key) => {
              return (
                <option key={key} value={key}>
                  {dialects.get(key)}
                </option>
              );
            })}
          </Select>
        </div>
        <Button onClick={sendForGeneration}>Generate API</Button>
      </>
    );
  }
  sendForGeneration = () => {
    const { apiState } = this.context;
    console.log(apiState);
    const sendingData = { ...apiState };
    const models = {};
    apiState.models.forEach((value, key) => {
      const model = { ...value };
      const fields = {};
      model.fields.forEach((field, fname) => {
        fields[fname] = { ...field };
      });
      console.log(fields);
      model.fields = fields;
      models[key] = model;
      console.log(models);
    });
    sendingData.models = models;
    const data = JSON.stringify(sendingData);
    try {
      fetch("http://localhost:3003", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
}

index.contextType = APIContext;

export default index;
