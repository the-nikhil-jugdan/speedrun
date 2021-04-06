import 'materialize-css'
import NavBar from './components/common/navbar'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './router'

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes/>
      </Router>
    </>
  );
}

export default App;
