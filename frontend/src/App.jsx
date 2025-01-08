
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard'; 
import Error404 from './pages/error404';

import Header from './components/header'; 
import SideBar from './components/SideBar';

//// SYSTÈME DE ROUTAGE ////

function App () {
    return (
      <Router>
        <Header />
        <SideBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Error404 />} /> 
        </Routes>
      </Router>
    )
}

export default App;
