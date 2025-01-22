import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hello from "../components/hello";
import ActivityChart from "../components/activityChart";
import AverageChart from "../components/averageChart";
import PerformanceChart from "../components/performanceChart";
import { fetchUserMainData, fetchUserActivityData, fetchUserAverageSessionsData, fetchUserPerformanceData } from "../services/toggleDataService";
import Error404 from "../pages/error404";


/**
 * Composant DashBoard
 * Affiche le tableau de bord utilisateur, incluant les graphiques, les données clés,
 * et un message d'erreur en cas de problème de récupération des données.
 *
 * @returns {JSX.Element} Le tableau de bord utilisateur ou une page d'erreur 404.
 */
function DashBoard() {
    ////// CONFIGURATION DE LA LOGIQUE DU COMPOSANT = "Back" ou logique métier //////
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [averageData, setAverageData] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                // Promise.all permet de regrouper les appels réseau, rendant la logique plus concise et lisible
                const [data, activity, average, performance] = await Promise.all([
                    fetchUserMainData(parseInt(userId)),
                    fetchUserActivityData(parseInt(userId)),
                    fetchUserAverageSessionsData(parseInt(userId)),
                    fetchUserPerformanceData(parseInt(userId)),
                ]);
                // utilisation de.some() pour éviter les répétitions
                if ([data, activity, average, performance].some(item => !item)) {
                    setIsError(true);
                } else {
                    setUserData(data);
                    setActivityData(activity);
                    setAverageData(average);
                    setPerformanceData(performance);
                }
            } catch {
                setIsError(true);
            }
        }
        fetchData();
    }, [userId]);


    ////// LOGIQUE DU RENDU VISUEL DU COMPOSANT = "Front" //////
    if (isError) {
        return <Error404 />;
    }

    return (
        <div>
            {/* Accueil personnalisé de l'utilisateur */}
            {userData && <Hello userInfos={userData} />}
            {/* Graphiques */}
            {activityData && <ActivityChart activityData={activityData} />}
            {averageData && <AverageChart averageData={averageData} />}
            {performanceData && <PerformanceChart performanceData={performanceData} />}
        </div>
    );
}

export default DashBoard;


