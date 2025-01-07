import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'; 
import Error404 from './pages/error404';

import Header from './components/header'; 
import SideBar from './components/SideBar';



function App () {
    return (
      <Router>
        <Header />
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} /> 
        </Routes>
      </Router>
    )
}

export default App;
