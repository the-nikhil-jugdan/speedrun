import React, { Component } from 'react';
import { Button , TextInput , Card } from 'react-materialize'
import {Link} from 'react-router-dom'
import {APIContext} from '../../context'

class index extends Component {

  
  render() {
    const {apiState,changeName} = this.context
    return (
      <div className="container" style={{
        marginTop:'5%'
      }}>
        <Card>
          <TextInput value={apiState.name} onChange={ changeName} label="Project Name"/>
          <Link to='/models'>
            <Button>
              Add a Model
            </Button>
          </Link>
        </Card>
      </div>
    );
  }
}

index.contextType = APIContext

export default index;