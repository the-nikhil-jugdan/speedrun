import 'materialize-css'
import NavBar from './components/common/navbar'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './router'
import {APIProvider} from './context'
import {Card} from 'react-materialize'

function App() {
  return (
    <>
      <APIProvider>
        <NavBar />
        <div className="container" style={{ marginTop: '2%' }}>
          <Card style={{height:'90%'}}>
        <Router>
          <Routes/>
            </Router>
          </Card>
        </div>
      </APIProvider>
    </>
  );
}

export default App;
