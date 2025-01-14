import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashBoard from './pages/dashboard';
import Error404 from './pages/error404';

import Header from './components/header';
import SideBar from './components/SideBar';

////// SYSTÈME DE ROUTAGE ////////

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Route dynamique pour le tableau de bord selon l'Id utilisateur */}
                <Route path="/:userId" element={<DashBoard />} />
                
                {/* Redirection vers une page d'erreur 404 pour toutes les autres URL non définies ici */}
                <Route path="*" element={<Error404 />} />
            </Routes>
            <SideBar />
        </Router>
    );
}

export default App;
