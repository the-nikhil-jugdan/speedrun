import 'materialize-css'
import NavBar from './components/common/navbar'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './router'
import {APIProvider} from './context'

function App() {
  return (
    <>
      <APIProvider>
        <NavBar />
        <Router>
          <Routes/>
        </Router>
      </APIProvider>
    </>
  );
}

export default App;
