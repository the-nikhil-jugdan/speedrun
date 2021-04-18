import React, { Component } from "react";
import { Button, TextInput } from "react-materialize";
import { Link } from "react-router-dom";
import { APIContext } from "../../context";

class index extends Component {
  render() {
    const { apiState, changeName } = this.context;
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
      </>
    );
  }
}

index.contextType = APIContext;

export default index;
