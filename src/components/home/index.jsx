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
    const { dialects } = this;
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          <TextInput
            label="Username"
            value={username}
            onChange={changeDBFields}
          />
          <TextInput
            label="Password"
            value={password}
            onChange={changeDBFields}
          />
          <TextInput
            label="Database"
            value={database}
            onChange={changeDBFields}
          />
          <TextInput label="Host" value={host} onChange={changeDBFields} />

          <Select label="Database" value={dialect} onChange={changeDBFields}>
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
        <Button>Generate API</Button>
      </>
    );
  }
}

index.contextType = APIContext;

export default index;
