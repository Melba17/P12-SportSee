import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashBoard from './pages/dashboard';
import Error404 from './pages/error404';

import Header from './components/header';
import SideBar from './components/sidebar';

////// SYSTÈME DE ROUTAGE ////////

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                 {/* Route pour l'accueil sans ID utilisateur */}
                 <Route path="/" element={<DashBoard />} />
                {/* Route dynamique pour le tableau de bord avec un userId */}
                <Route path="/:userId" element={<DashBoard />} />
                {/* Redirection vers une page d'erreur 404 pour toutes les autres URL non définies ici */}
                <Route path="*" element={<Error404 />} />
            </Routes>
            <SideBar />
        </Router>
    );
}

export default App;
