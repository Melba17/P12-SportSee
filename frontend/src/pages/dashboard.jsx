import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Hello from "../components/hello";
import ActivityChart from "../components/activityChart";
import AverageChart from "../components/averageChart";
import PerformanceChart from "../components/performanceChart";
import ScoreChart from "../components/scoreChart";
import KeyData from "../components/KeyData";
import WelcomeMessage from "../components/welcomeMessage";
import { fetchData } from "../services/toggleDataService";
import Error404 from "../pages/error404";
    
/**
 * Composant DashBoard
 * 
 * Affiche le tableau de bord d'un utilisateur en récupérant ses données via des appels API ou des données mockées.
 * Gère le chargement, les erreurs (404 et serveur) et affiche les graphiques et indicateurs clés.
 * 
 * @returns {JSX.Element} Le tableau de bord utilisateur, un message de bienvenue, 
 * une erreur 404 si l'utilisateur est introuvable ou un message d'erreur serveur.
 */
function DashBoard() {
    ////// CONFIGURATION DE LA LOGIQUE DU COMPOSANT //////
    const { userId } = useParams(); // Extrait l'Id sous forme de chaînes de caractères
    const navigate = useNavigate(); // Permet de changer d'utilisateur dynamiquement 
    const handleUserSelection = (id) => navigate(`/${id}`); // Redirige vers l'ID utilisateur sélectionné en cliquant sur un bouton

    // Objet pour établir ou réinitialiser complètement l'état global
    const initialState = {
        userData: null,
        activityData: null,
        averageData: null,
        performanceData: null,
        isLoading: true,
        errorType: null, // '404' ou 'server'
    };

    // État global des données utilisateur
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (!userId) return;

        setState(initialState); // Réinitialisation avant chargement des nouvelles données

        const loadUserData = async () => {
            const data = await fetchData(userId);
            setState({ ...data, isLoading: false });
        };

        loadUserData();
    }, [userId]);

    ////// RENDU CONDITIONNEL //////
    if (!userId) return <WelcomeMessage handleUserSelection={handleUserSelection} />;
    if (state.isLoading) return <div className="loading"><p>Chargement des données en cours...</p></div>;
    if (state.errorType === "404") return <Error404 />;
    if (state.errorType === "server") return <div className="server-error"><p>Le service est temporairement indisponible. Veuillez réessayer plus tard.</p></div>;

    return (
        <div>
            {/* Accueil personnalisée */}
            {state.userData && <Hello userInfos={state.userData} />}

            {/* Graphiques */}
            {state.activityData && <ActivityChart activityData={state.activityData} />}
            {state.averageData && <AverageChart averageData={state.averageData} />}
            {state.performanceData && <PerformanceChart performanceData={state.performanceData} />}
            {state.userData && <ScoreChart score={state.userData.score} />}

            {/* Données nutritionnelles clés */}
            {state.userData && (
                <div className="keydata-list">
                    {/* Parcourt `keyData` avec `map()` et extrait les paires [clé, valeur] grâce à `Object.entries()`. Les valeurs (`value`, `icon`, `label`, `unit`) sont ensuite passées en props à `KeyData`. */}
                    {Object.entries(state.userData.keyData).map(([key, { value, icon, label, unit }]) => (
                        <KeyData key={key} icon={icon} value={value} unit={unit} label={label} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default DashBoard;
   
                 
                            
                            