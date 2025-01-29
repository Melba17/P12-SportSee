import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hello from "../components/hello";
import ActivityChart from "../components/activityChart";
import AverageChart from "../components/averageChart";
import PerformanceChart from "../components/performanceChart";
import ScoreChart from "../components/scoreChart";
import KeyData from "../components/KeyData";
import { fetchUserMainData, fetchUserActivityData, fetchUserAverageSessionsData, fetchUserPerformanceData } from "../services/toggleDataService";
import Error404 from "../pages/error404";
    
    
    /**
     * Composant DashBoard
     * 
     * Ce composant représente le tableau de bord utilisateur. Il récupère les données de l'utilisateur via des appels API, affiche différents graphiques et données clés, et gère les erreurs critiques (serveur, réseau) ainsi que les cas où l'utilisateur est introuvable. 
     * 
     * Fonctionnalités principales :
     * - Appels réseau pour récupérer les données utilisateur (principales, activité, sessions moyennes, performances).
     * - Gestion des erreurs : affiche un message d'erreur en cas de panne serveur/réseau ou une page 404 si l'utilisateur est introuvable.
     * - Affichage des graphiques et des données clés si les données sont valides.
     *
     * @returns {JSX.Element} - Retourne le contenu du tableau de bord, ou une page 404, ou un message d'erreur serveur.
     */
    function DashBoard() {
        ////// CONFIGURATION DE LA LOGIQUE DU COMPOSANT = "Back" ou logique métier //////
        const { userId } = useParams(); // Extrait l'Id sous forme de chaînes de caractères
        const [userData, setUserData] = useState(null);
        const [activityData, setActivityData] = useState(null);
        const [averageData, setAverageData] = useState(null);
        const [performanceData, setPerformanceData] = useState(null);
        const [isLoading, setIsLoading] = useState(true);
        const [isError, setIsError] = useState(false);
        const [isServerError, setIsServerError] = useState(false);
    
        useEffect(() => {
            async function fetchData() {
                setIsLoading(true); 
                try {
                    const [data, activity, average, performance] = await Promise.all([
                        fetchUserMainData(parseInt(userId)), // Convertit l'Id chaîne de caractères en un nombre entier
                        fetchUserActivityData(parseInt(userId)),
                        fetchUserAverageSessionsData(parseInt(userId)),
                        fetchUserPerformanceData(parseInt(userId)),
                    ]);
                    if ([data, activity, average, performance].some(item => !item)) {
                        setIsError(true); // Erreur 404
                    } else {
                        setUserData(data);
                        setActivityData(activity);
                        setAverageData(average);
                        setPerformanceData(performance);
                    }
                } catch (error) {
                    console.error("Erreur capturée :", error);
                    setIsServerError(true); // Erreur serveur ou reseau (perte de connexion par exemple)
                }
                finally {
                    setIsLoading(false); 
                }
            }
            fetchData();
        }, [userId]);
    
        ////// LOGIQUE DU RENDU VISUEL = "Front" //////

        // Message de chargement au besoin
        if (isLoading) {
            return (
                <div className="loading">
                    <p>Chargement des données en cours...</p>
                </div>
            );
        }
        // Message d'erreur serveur
        if (isServerError) {
            return (
                <div className="server-error">
                    <p>Le service est temporairement indisponible. Veuillez réessayer plus tard.</p>
                </div>
            );
        }
        // Affichage page d'erreur 404
        if (isError) {
            return <Error404 />;
        }
    
        return (
            <div>
                {/* Message d'accueil */}
                {userData && <Hello userInfos={userData} />}
                {/* Graphiques */}
                {activityData && <ActivityChart activityData={activityData} />}
                {averageData && <AverageChart averageData={averageData} />}
                {performanceData && <PerformanceChart performanceData={performanceData} />}
                {userData && <ScoreChart score={userData.score} />}
                {/* Données nutritionnelles clés */}
                {userData && (
                    <div className="keydata-list">
                        {Object.entries(userData.keyData).map(([key, { value, icon, label, unit }]) => (
                        <KeyData
                            key={key}
                            icon={icon}
                            value={value} 
                            unit={unit}   
                            label={label}
                        />
                        ))}
                    </div>
                    )}
            </div>
        );
    }
    
    export default DashBoard;
    
    
    